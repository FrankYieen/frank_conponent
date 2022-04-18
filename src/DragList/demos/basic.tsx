import React from 'react';
import { DragList } from 'frank_component';
import './basic.less';

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];

export default () => {
  let dragRef = React.createRef<any>();

  const onChange = (oldIndex: number, newIndex: number) => {
    console.log(oldIndex, newIndex);
  };

  return (
    <div>
      <button onClick={() => dragRef.current?.back()}>back Status</button>
      <DragList
        ref={dragRef}
        onChange={onChange}
        dataList={items}
        itemRender={(item: string, dex: number) => <span style={{ color: 'red' }}>{item}</span>}
      />
    </div>
  );
};
