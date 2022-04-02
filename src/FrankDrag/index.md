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
import dragPng from './icon/drag.png'

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

### 样式
使用时如需要样式，请引入主样式文件 `frank_component/es/Style/index.css`;  
例如antdpro中使用,只需在`global.less`文件头写入 `@import '~frank_component/es/Style/index.css';`;  


### API
#### FrankDrag
|  参数   | 说明  | 类型 | 默认值 |
|  :----  | :----  | :----  | :----  |
| childrens  | 可拖动的列表 | `ReactNode[]` | [ ] |
| dragType | 拖动item的方式 | `outside`  \|  `line`  \|  `prefix`  \|  `suffix`  | `prefix` |
| DragItemClass |  拖动item的自定义样式 | `string` | - |
| fixIcon  | 自定义拖动图标（只有当dragType为prefix或suffix时有效） |  `ReactNode` | - |
| ItemClass |  拖动item内容区域的自定义样式 | `string` | - |
| onChange  | 拖动结束，位置变化的回调 | `function(oldIndex,newIndex)` | -|

#### FrankDrag Methods
|  名称   | 说明  | 参数 | 版本 |
|  :----  | :----  | :----  | :----  |
|  back  |  回退到列表此次拖动之前的状态 |  ( ) | - |