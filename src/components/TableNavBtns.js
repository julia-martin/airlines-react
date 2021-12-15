import React from 'react';

const TableNavBtns = ({ handlePrevPage, handleNextPage }) => {
  return  (
    <div className="table-nav">
      <button onClick={handlePrevPage}>Previous Page</button>
      <button onClick={handleNextPage}>Next Page</button>
    </div>
  );
};

export default TableNavBtns