import React, { useState, useEffect } from "react";
import TableMessage from "./TableMessage";
import TableNavBtns from "./TableNavBtns";

const Table = ({ className, columns, rows, perPage }) => {
  const [rowStartIdx, setRowStartIdx] = useState(0);
  const [displayedRows, setDisplayedRows] = useState(rows.slice(0, perPage));

  useEffect(() => {
    if (rows.length < rowStartIdx) {
      setRowStartIdx(0);
    }

    setDisplayedRows(rows.slice(rowStartIdx, rowStartIdx + perPage));
  }, [rowStartIdx, rows, perPage]);

  const handlePrevPage = () => {
    setRowStartIdx(rowStartIdx - perPage);
  };

  const handleNextPage = () => {
    setRowStartIdx(rowStartIdx + perPage);
  };

  return (
    <>
      <table className={className}>
        <thead>
          <tr>
            {columns.map(({ name, property }) => {
              return (
                <th property={property} key={`${property}-header`}>
                  {name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {displayedRows.map((row, rowIndex) => {
            return (
              <tr key={`row-${rowIndex}`}>
                {Object.values(row).map((value, colIndex) => {
                  return <td key={`col-${colIndex}`}>{value}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <TableMessage
        firstN={rowStartIdx}
        totalRows={rows.length}
        perPage={perPage}
      />
      <TableNavBtns
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        prevDisabled={rowStartIdx === 0}
        nextDisabled={rowStartIdx + perPage >= rows.length}
      />
    </>
  );
};

export default Table;
