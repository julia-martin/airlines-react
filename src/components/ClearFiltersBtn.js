import React from 'react';

const ClearFiltersBtn = ({ handleClick, disabled, children }) => {
  return (
    <button onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default ClearFiltersBtn;