import React, { useEffect, useState, useImperativeHandle, forwardRef, Ref } from 'react';
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMove , isPathHave} from './utils'
import dragPng from './icon/drag.png'
import './style.less'

interface Onchange {
  (oldIndex?: number, newIndex?: number): any;
}

enum dragTypeEmum { 'outside', 'line', 'prefix', 'suffix' };

type Props = {
  childrens?: React.ReactNode[];
  onChange?: Onchange,
  dragType?: dragTypeEmum,
  fixIcon?: React.ReactNode,
  DragItemClass?: string,
  ItemClass?: string,
}

const FrankDrag = (Props: Props, parentRef: Ref<null> | null) => {
  const {
    childrens = [],
    onChange = (oldIndex?: number, newIndex?: number) => null,
    dragType = dragTypeEmum[2],
    fixIcon = <img className={'icon'} src={dragPng}></img>,
    DragItemClass = '',
    ItemClass = ''
  } = Props

  const [list, setList] = useState<React.ReactNode[]>([])
  const [oldDex, setOldDex] = useState(0)
  const [newDex, setNewDex] = useState(0)

  const SortableList = SortableContainer(({ children}:any) => {
    return (<div>
      {children}
    </div>)
  });

  
  const SortableItem = SortableElement((element:any) => {
    
    return (
      <div className={`dragItems ${DragItemClass}`}>
        {dragType === 'prefix' && <div className={'div_Preicon'} id='TX_icon'>{fixIcon}</div>}
        <div id='TX_dragItem' key='item' className={`dragItem ${ItemClass}`}>
          {element.value}
        </div>
        {dragType === 'suffix' && <div className={'div_Suficon'} id='TX_icon'>{fixIcon}</div>}
      </div>
    )
  });

  const backStatus = (): void => {
    setList(arr => {
      return arrayMove(arr, newDex, oldDex)
    });
  }

  useImperativeHandle<any, any>(parentRef, () => {
    return {
      back: backStatus,
    };
  });

  // 整个元素排序的容器
  const onSortEnd = (params: { oldIndex: number, newIndex: number }) => {
    const { oldIndex, newIndex } = params
    setOldDex(oldIndex)
    setNewDex(newIndex)
    onChange(oldIndex, newIndex)
    setList(arr => {
      return arrayMove(arr, oldIndex, newIndex)
    });
  };

  const shouldCancelStart = (SortEvent:any) => {
    if (dragType === 'line') return false
    if (dragType === 'outside') return isPathHave(SortEvent.path||[],'TX_dragItem')
    return  !isPathHave(SortEvent.path||[],'TX_icon')
  }

  useEffect(() => {
    setList(childrens)
  }, [])

  return (
    <SortableList shouldCancelStart={shouldCancelStart} onSortEnd={onSortEnd}>
      {
        list.map((element, index) => (
          <SortableItem type={dragType} key={`TX_Drag-${index}`} index={index} value={element} />))
      }
    </SortableList>

  );
}
export default forwardRef(FrankDrag);
