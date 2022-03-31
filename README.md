|  参数   | 说明  | 类型 | 默认值
|  :----  | :----  | :----  | :----  |
| children  | 可拖动的列表 | ReactNode[] | [ ] |
| onChange  | 拖动结束，位置变化的回调 | function(oldIndex,newIndex) | -|
| dragType | 拖动类型的类型 | 'outside'  \|  'line'  \|  'prefix'  \|  'suffix'  | 'prefix' |
| fixIcon  | 自定义拖动图标（只有当dragType为prefix或suffix时有效） |  ReactNode | - |
| DragItemClass |  拖动item的自定义样式 | string | - |
| ItemClass |  拖动item内容区域的自定义样式 | string | - |