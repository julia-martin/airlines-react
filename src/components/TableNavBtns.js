import React from 'react';

const TableNavBtns = ({ handlePrevPage, handleNextPage, prevDisabled, nextDisabled }) => {
  return  (
    <div className="table-nav">
      <button onClick={handlePrevPage} disabled={prevDisabled}>Previous Page</button>
      <button onClick={handleNextPage} disabled={nextDisabled}>Next Page</button>
    </div>
  );
};

export default TableNavBtns