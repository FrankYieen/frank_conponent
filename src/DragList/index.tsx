import React, { useEffect, useState, useImperativeHandle, forwardRef, Ref } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMove, isPathHave } from './utils';
import dragPng from './icon/drag.png';
import './style.less';

interface OnchangeFace {
  (oldIndex?: number, newIndex?: number): any;
}

interface itemRenderFace {
  (item: any, index: number): React.ReactNode | string;
}

enum dragTypeEmum {
  'outside',
  'line',
  'prefix',
  'suffix',
}

type Props = {
  childrens?: React.ReactNode[];
  dataList?: any[];
  onChange?: OnchangeFace;
  dragType?: dragTypeEmum;
  fixIcon?: React.ReactNode;
  DragItemClass?: string;
  itemRender?: itemRenderFace;
};

const FrankDrag = (Props: Props, parentRef: Ref<null> | null) => {
  const {
    onChange = (): any => null,
    dragType = dragTypeEmum[2],
    dataList = [],
    fixIcon = <img className={'icon'} src={dragPng}></img>,
    DragItemClass = '',
    itemRender = () => null,
  } = Props;

  const [list, setList] = useState<React.ReactNode[]>([]);
  const [statusArr, setStatusArr] = useState([]);

  const SortableList = SortableContainer(({ children }: any) => {
    return <div>{children}</div>;
  });

  const SortableItem = SortableElement((element: any) => {
    return (
      <div className={`dragItems ${DragItemClass}`}>
        {dragType === 'prefix' && (
          <div className="div_icon" id="TX_icon">
            {fixIcon}
          </div>
        )}
        <div className="customItem">{element.value}</div>
        {dragType === 'suffix' && (
          <div className="div_icon" id="TX_icon" style={{ textAlign: 'right' }}>
            {fixIcon}
          </div>
        )}
      </div>
    );
  });

  const backStatus = (): void => {
    if (statusArr.length) {
      const temp = [...statusArr];
      const popItem = temp.splice(temp.length - 1, 1)[0];
      setStatusArr([...temp]);
      setList((arr) => {
        return arrayMove([...arr], popItem[1], popItem[0]);
      });
    }
  };

  useImperativeHandle<any, any>(parentRef, () => {
    return {
      back: backStatus,
    };
  });

  // 整个元素排序的容器
  const onSortEnd = (params: { oldIndex: number; newIndex: number }) => {
    const { oldIndex, newIndex } = params;
    onChange(oldIndex, newIndex);
    setStatusArr((cur) => [...cur, [oldIndex, newIndex]]);
    setList((arr) => {
      return arrayMove(arr, oldIndex, newIndex);
    });
  };

  const shouldCancelStart = (SortEvent: any) => {
    if (dragType === 'line') return false;
    if (dragType === 'outside') return isPathHave(SortEvent.path || [], 'TX_dragItem');
    return !isPathHave(SortEvent.path || [], 'TX_icon');
  };

  useEffect(() => {
    setList([...dataList]);
  }, [dataList]);

  return (
    <SortableList shouldCancelStart={shouldCancelStart} onSortEnd={onSortEnd}>
      {list.map((item, index) => (
        <SortableItem
          type={dragType}
          key={`TX_Drag-${index}`}
          index={index}
          value={itemRender(item, index)}
        />
      ))}
    </SortableList>
  );
};
export default forwardRef(FrankDrag);
