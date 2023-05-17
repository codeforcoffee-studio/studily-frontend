import React, { useState } from 'react';

const HighlightOnDragComponent = () => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsHighlighted(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragLeave = () => {
    setIsHighlighted(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsHighlighted(false);

    // Handle the dropped item
    const draggedItemId = event.dataTransfer.getData('text/plain');
    console.log('Dropped Item ID:', draggedItemId);
  };

  return (
    <div
      className={isHighlighted ? 'highlighted' : ''}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      Drop Zone
    </div>
  );
};

export default HighlightOnDragComponent;
