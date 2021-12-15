import React from "react";

const TableMessage = ({ firstN, totalRows, perPage }) => {
  return (
    <p>
      Showing {firstN + 1}-{firstN + perPage} of {totalRows} routes.
    </p>
  );
};

export default TableMessage;
