---
title: 基本使用
nav:
  title: 组件
  path: /frankdrag
  order: 2
group:
  path: /frankdrag/DragValid
  title: 滑块验证
  order: 2
---

## DragValid

基础使用：

```tsx
import React, { useRef } from 'react';
import { DragValid } from 'frank_component';

const imgList = [
  'https://pic2.zhimg.com/80/v2-f49893626c477075c0377e2d31031ca9_720w.jpg',
  'https://pic1.zhimg.com/80/v2-cc30371316c543769d99ef4405343228_720w.jpg',
];

export default () => {
  const fancyInputRef = useRef<any>();

  const success = (time: number, errorCount: number) => {
    console.log(time, errorCount);
  };

  const failed = (time: number, errorCount: number) => {
    console.log(time, errorCount);
  };

  return (
    <div>
      <DragValid ref={fancyInputRef} imgList={imgList} onSuccess={success} onFailed={failed} />
      <button
        style={{ float: 'right' }}
        onClick={() => console.log(fancyInputRef.current.refresh())}
      >
        主动刷新
      </button>
    </div>
  );
};
```

### API

#### DragValid

| 参数      | 说明                 | 类型       | 默认值                 |
| :-------- | :------------------- | :--------- | :--------------------- |
| width     | 验证图片区域宽度     | `number`   | 350                    |
| height    | 验证图片区域高度     | `number`   | 170                    |
| scope     | 拖动目标区域随机范围 | `number[]` | [0.3,0.7]              |
| offset    | 允许偏差值像素值     | `number`   | 4                      |
| top       | 滑块距离顶部高度     | `number`   | height/2-20            |
| imgList   | 素材图片数组         | `string[]` | -                      |
| onSuccess | 验证成功回调         | `string[]` | (time,errorCount): any |
| onFailed  | 验证失败回调         | `string[]` | (time,errorCount): any |

#### DragValid Methods

| 名称    | 说明     | 参数 | 版本 |
| :------ | :------- | :--- | :--- |
| refresh | 主动刷新 | ( )  | -    |
