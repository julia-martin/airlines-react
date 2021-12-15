import React from "react";

const Table = ({ className, columns, rows }) => {
  return (
    <table className={className}>
      <thead>
        <tr>
          {columns.map(({ name, property }) => {
            return <th property={property}>{name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          return (
            <tr>
              {Object.values(row).map((value) => {
                return <td>{value}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
