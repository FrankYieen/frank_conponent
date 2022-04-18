---
title: 基本使用
nav:
  title: 组件
  path: /frankdrag
  order: 2
group:
  path: /frankdrag/DragList
  title: 拖动列表
  order: 1
---

## DragList

基础使用： <code src="./demos/basic.tsx" background="#f0f2f5" title="基础使用" />

### API

#### DragList

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| dataList | 被渲染的数组数据 | `object[]` | [ ] |
| dragType | 拖动 item 的方式 | `outside` \| `line` \| `prefix` \| `suffix` | `prefix` |
| DragItemClass | 拖动 item 的自定义样式 | `string` | - |
| fixIcon | 自定义拖动图标（只有当 dragType 为 prefix 或 suffix 时有效） | `ReactNode` | - |
| itemRender | 渲染函数，参数分别为当前当前行数据、行索引 | `function(record, index) {} ` | - |
| onChange | 拖动结束，位置变化的回调 | `function(oldIndex,newIndex) {}` | - |

#### DragList Methods

| 名称 | 说明                         | 参数 | 版本 |
| :--- | :--------------------------- | :--- | :--- |
| back | 回退到列表此次拖动之前的状态 | ( )  | -    |
