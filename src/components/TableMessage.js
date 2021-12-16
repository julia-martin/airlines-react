import React from "react";

const TableMessage = ({ firstN, totalRows, perPage }) => {
  const lastN = firstN + perPage > totalRows ? totalRows : firstN + perPage;
  return (
    <p>
      Showing {firstN + 1}-{lastN} of {totalRows} routes.
    </p>
  );
};

export default TableMessage;
