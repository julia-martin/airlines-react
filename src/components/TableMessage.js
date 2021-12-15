import React from 'react';

const TableMessage = ({ firstN, totalRows }) => {
  return (
    <p>Showing {firstN + 1}-{firstN + 25} of {totalRows} routes.</p>
  );
};

export default TableMessage;

