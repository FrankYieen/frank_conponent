---
nav:
  title: 组件
  path: /frankdrag
---

## Frankdrag

Demo:
```jsx
import React, { Ref, useEffect, useState } from 'react';
import { FrankDrag } from 'frank_component';

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];

export default () => {
  let dragRef = React.createRef();

  const elementList = items.map((item, dex) => {
    return (
      <div key={`${item}${dex}`}>
        {item}
      </div>)
  })

  const onChange = (oldIndex, newIndex) => {
    console.log(oldIndex, newIndex)
  }

  return (
    <div>
      <button onClick={() => dragRef.current?.back()}>back Status</button>
      <FrankDrag ref={dragRef} onChange={onChange} childrens={elementList} />
    </div>
  );
}
```

|  参数   | 说明  | 类型 | 默认值
|  :----  | :----  | :----  | :----  |
| children  | 可拖动的列表 | ReactNode[] | [ ] |
| onChange  | 拖动结束，位置变化的回调 | function(oldIndex,newIndex) | -|
| dragType | 拖动类型的类型 | 'outside'  \|  'line'  \|  'prefix'  \|  'suffix'  | 'prefix' |
| fixIcon  | 自定义拖动图标（只有当dragType为prefix或suffix时有效） |  ReactNode | - |
| DragItemClass |  拖动item的自定义样式 | string | - |
| ItemClass |  拖动item内容区域的自定义样式 | string | - |