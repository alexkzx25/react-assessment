import React, { useState, useRef } from 'react';

import { SalesLineChart } from "./components/salesLineChart.tsx";
import { SalesBarChart } from "./components/salesBarChart.tsx";
import { CategoryPieChart } from "./components/categoryPieChart.tsx";
import { UsersTable, ProductsTable } from "./components/usersTable.tsx";
import './index.css';

// Main App Component



const App = () => {

  const [items, setItems] = useState([
    { id: 1, content: <SalesLineChart /> },
    { id: 2, content: <CategoryPieChart /> },
    { id: 3, content: <SalesBarChart /> },
    { id: 4, content: <UsersTable /> },
    { id: 5, content: <ProductsTable /> },
  ]);

  const [draggedItem, setDraggedItem] = useState(null);


  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', item.content);
  };


  const handleDragOver = (e) => {
    e.preventDefault();
    const offsetX = e.nativeEvent.offsetX;
    const targetElement = e.target;

    if (offsetX < targetElement.offsetWidth / 2) {
      targetElement.classList.add('insert-before');
      targetElement.classList.remove('insert-after');
    } else {
      targetElement.classList.add('insert-after');
      targetElement.classList.remove('insert-before');
    }
  };


  const handleDragEnter = (e) => {
    e.preventDefault();
  };


  const handleDragLeave = (e) => {
    e.target.classList.remove('insert-before', 'insert-after');
  };

  const handleDrop = (e, targetItem) => {
    e.preventDefault();
    e.target.classList.remove('insert-before', 'insert-after');

    const targetIndex = items.findIndex(item => item.id === targetItem.id);
    const draggedIndex = items.findIndex(item => item.id === draggedItem.id);

    const updatedItems = [...items];
    updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(targetIndex, 0, draggedItem);

    setItems(updatedItems);
  };

  return (
    <div style={{width: 1000}}>
      <h1 className="title">Sample Dashboard with resize & reposition </h1>
      <div className="parent" >
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`draggable`}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, item)}
            >
              <div>{item.content}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;