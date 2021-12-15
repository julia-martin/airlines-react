import React from "react";

const Table = ({ className, columns, rows }) => {
  return (
    <table className={className}>
      <thead>
        <tr>
          {columns.map(({ name, property }) => {
            return <th property={property} key={`${property}-header`}>{name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => {
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
  );
};

export default Table;
