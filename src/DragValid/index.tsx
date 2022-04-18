import React, { useEffect, useState, useRef, useImperativeHandle } from 'react';
import dragIcon from './icon/drag.png';
import successIcon from './icon/success.png';
import refreshIcon from './icon/refresh.png';
import { RandomNumBoth } from './utils';
import './style.less';

interface onDone {
  (time?: number, errorCount?: number): any;
}

enum dragTypeEmum {
  'wait',
  'draging',
  'success',
  'fail',
}

type Props = {
  /**
   * @description 验证图片区域宽度
   * @defalut 350
   */
  width?: number;

  /**
   * @description 验证图片区域高度
   * @defalut 170
   */
  height?: number;

  /**
   * @description 拖动目标区域随机范围
   * @defalut [0.3,0.7]
   */
  scope?: number[];

  /**
   * @description 允许偏差值像素值
   * @defalut 4
   */
  offset?: number;

  /**
   * @description 滑块距离顶部高度
   * @defalut height/2-20
   */
  top?: number;

  /**
   * @description 素材图片数组
   * @defalut
   */
  imgList?: string[];

  /**
   * @description 验证成功回调
   * @defalut
   * @param {number} time 拖动开始到结束所用时间
   * @param {number} errorCount 错误次数
   */
  onSuccess?: onDone;

  /**
   * @description 验证失败回调
   * @defalut
   * @param {number} time 拖动开始到结束所用时间
   * @param {number} errorCount 错误次数
   */
  onFailed?: onDone;
};

let startX: number = 0;

const FrankValid = (
  {
    width = 350,
    height = 170,
    scope = [0.3, 0.7],
    offset = 4,
    top = height / 2 - 20,
    imgList = ['https://pic3.zhimg.com/80/v2-251500f01696efc7b37f1ed520372596_720w.jpg'],
    onSuccess = () => null,
    onFailed = () => null,
  }: Props,
  currentRef: React.Ref<null> | null,
) => {
  const [widthFix, setWidthFix] = useState(-1);
  const [dragLength, setDragLength] = useState(0);
  const [dragStatus, setDragStatus] = useState(dragTypeEmum[0]);
  const [errorCount, setErrorCount] = useState(0);
  const [img, setImg] = useState<any>();
  const [dragStartTime, setDragStartTime] = useState(0);

  const backCanvas = useRef<any>();
  const sliderCanvas = useRef<any>();

  /**
   * @description 不规则图形剪切
   * @param {any} ctx  被剪切的canvas对象
   * @param {number} x  剪切起点x坐标
   * @param {number} y  剪切起点y坐标
   * @param {string} type @default 'fill'  剪切类型
   */
  const canvasDraw = (ctx: any, x: number, y: number, type: string = 'fill') => {
    ctx.strokeStyle = 'rgba(255,255,255, 0.8)';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    const offset = 8 / Math.sqrt(2);
    ctx.lineTo(x, y);
    ctx.arc(x + 20, y - offset, 8, Math.PI * 0.75, Math.PI * 0.25);
    ctx.lineTo(x + 40, y);
    ctx.arc(x + 40 + offset, y + 20, 8, Math.PI * 1.25, Math.PI * 0.75);
    ctx.lineTo(x + 40, y + 40);
    ctx.lineTo(x, y + 40);
    ctx.arc(x + offset, y + 20, 8, Math.PI * 0.75, Math.PI * 1.25, true);
    ctx.closePath();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.stroke();
    if (type === 'fill') {
      ctx.fill();
    } else {
      ctx.save();
      ctx.clip();
    }
  };

  // 背景图绘制
  const drawBack = () => {
    const backImgCtx = backCanvas.current.getContext('2d');
    const tempImage = new Image();
    tempImage.onload = function () {
      backImgCtx.drawImage(tempImage, 0, 0, width, height);
    };
    tempImage.src = img;
    canvasDraw(backImgCtx, widthFix, top);
  };

  // 剪切图片绘制
  const drawSlider = () => {
    const sliderCtx = sliderCanvas.current.getContext('2d');
    const tempImage = new Image();
    tempImage.onload = function () {
      sliderCtx.drawImage(tempImage, 0, 0, width, height);
    };
    tempImage.src = img;
    canvasDraw(sliderCtx, widthFix, top, 'clip');
    setTimeout(() => {
      if (document.getElementById('frank_refresh')?.style?.animation) {
        document.getElementById('frank_refresh').style.animation = '';
      }
    }, 500);
  };

  // 开始拖动
  const dragStart = (e: React.DragEvent) => {
    if (dragStatus === dragTypeEmum[0]) {
      setDragStartTime(new Date().valueOf());
      setDragStatus(dragTypeEmum[1]);
      startX = e.screenX;
      // 清除拖动虚影
      let dragIcon = document.createElement('img');
      dragIcon.src = '';
      dragIcon.width = 0;
      dragIcon.height = 0;
      dragIcon.style.opacity = '0';
      e.dataTransfer.setDragImage(dragIcon, 0, 0);
    }
  };

  const touchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    if (dragStatus === dragTypeEmum[0]) {
      const touchE = e.targetTouches[0];
      setDragStartTime(new Date().valueOf());
      setDragStatus(dragTypeEmum[1]);
      startX = touchE.screenX;
    }
  };

  // 拖动中
  const draging = (e: React.DragEvent) => {
    if (dragStatus === dragTypeEmum[1]) {
      const subX = e.screenX - startX;
      subX > 0 && subX < width - 55 && setDragLength(subX);
    }
  };

  const touching = (e: React.TouchEvent) => {
    if (dragStatus === dragTypeEmum[1]) {
      const touchE = e.targetTouches[0];
      const subX = touchE.screenX - startX;
      subX > 0 && subX < width - 55 && setDragLength(subX);
    }
  };

  // 拖动结束
  const dragEnd = (e: React.DragEvent) => {
    e.preventDefault();
    const endLength = -widthFix + 5 + dragLength;
    Math.abs(endLength) <= Math.abs(offset)
      ? setDragStatus(dragTypeEmum[2])
      : setDragStatus(dragTypeEmum[3]);
  };

  const touchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    const endLength = -widthFix + 5 + dragLength;
    Math.abs(endLength) <= Math.abs(offset)
      ? setDragStatus(dragTypeEmum[2])
      : setDragStatus(dragTypeEmum[3]);
  };

  // 图片随机选择
  const ramdomImg = () => {
    const randomImgSrc: string = imgList[Math.floor(Math.random() * imgList.length)];
    setImg(randomImgSrc);
  };

  // 点击刷新
  const refresh = () => {
    document.getElementById('frank_refresh').style.animation = 'frank_loading 1.2s infinite';
    reDraw();
    calWidthFix();
    ramdomImg();
  };

  // 重绘
  const reDraw = () => {
    const backImgCtx = backCanvas.current.getContext('2d');
    const sliderCtx = sliderCanvas.current.getContext('2d');
    backImgCtx.clearRect(0, 0, width, height);
    sliderCtx.restore();
    sliderCtx.clearRect(0, 0, width, height);
    drawBack();
    drawSlider();
    setDragLength(0);
    setDragStatus(dragTypeEmum[0]);
  };

  // 偏移距离计算
  const calWidthFix = () => {
    try {
      const fix: any = RandomNumBoth(scope[0], scope[1] || scope[0], width);
      setWidthFix(fix);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    reDraw();
  }, [widthFix]);

  useEffect(() => {
    calWidthFix();
    ramdomImg();
  }, []);

  useEffect(() => {
    if (dragStatus === dragTypeEmum[3]) {
      onFailed(new Date().valueOf() - dragStartTime, errorCount + 1);
      document.getElementById('sliderBack').className += ' error';
      setTimeout(() => {
        setDragLength(0);
        document.getElementById('sliderBack').className = 'slider';
      }, 200);
      setDragStatus(dragTypeEmum[0]);
      setErrorCount((cur) => ++cur);
    } else if (dragStatus === dragTypeEmum[2]) {
      onSuccess(new Date().valueOf() - dragStartTime, errorCount);
      setErrorCount(0);
    }
  }, [dragStatus]);

  // 暴露给父组件
  useImperativeHandle<any, any>(currentRef, () => ({
    refresh,
  }));

  return (
    <div className="wrap">
      <span className="span">
        <img id="frank_refresh" onClick={refresh} className="refresh" src={refreshIcon} />
        <canvas ref={backCanvas} className="backCanvas" width={width} height={height} />
        <canvas
          ref={sliderCanvas}
          style={{ left: -widthFix + 5 + dragLength }}
          className="sliderCanvas"
          width={width}
          height={height}
        />
      </span>
      <div className="sliderBack" style={{ width: width }}>
        <div
          id="sliderBack"
          className={`slider ${dragStatus === dragTypeEmum[2] ? 'success' : ''}`}
          style={{ width: dragLength + 20 }}
        >
          <div
            id="fran_dragValidElement"
            style={{ left: dragLength || 0 }}
            draggable={dragStatus === dragTypeEmum[0]}
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            onDrag={draging}
            onTouchStart={touchStart}
            onTouchMove={touching}
            onTouchEnd={touchEnd}
            className="sliderButton"
          >
            {dragStatus === dragTypeEmum[2] ? (
              <div className="successIcon">
                <img draggable="false" src={successIcon} />
                <div className="successIconRight" />
              </div>
            ) : (
              <img draggable="false" src={dragIcon} />
            )}
          </div>
        </div>
        <span className="text" style={{ filter: dragStatus !== dragTypeEmum[0] && 'blur(1px)' }}>
          拖动滑块完成拼图
        </span>
      </div>
    </div>
  );
};
export default React.forwardRef(FrankValid);
