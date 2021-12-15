import React, { useState, useEffect, Component } from "react";
import "./App.css";
import Table from "./components/Table";
import TableMessage from "./components/TableMessage";
import TableNavBtns from "./components/TableNavBtns";
import data, { getAirlineById, getAirportByCode } from "./data.js";
const { routes, airlines, airports } = data;

// Columns that correspond with route objects
const columns = [
  { name: "Airline", property: "airline" },
  { name: "Source Airport", property: "src" },
  { name: "Destination Airport", property: "dest" },
];

// Convert routes into "human readable format"
const rows = routes.map((route) => {
  return {
    airline: getAirlineById(route.airline, airlines).name,
    src: getAirportByCode(route.src, airports).name,
    dest: getAirportByCode(route.dest, airports).name,
  };
});

const rowsPerPage = 25;

const App = () => {
  const [rowStartIdx, setRowStartIdx] = useState(0);
  const [displayedRows, setDisplayedRows] = useState(
    rows.slice(0, rowsPerPage)
  );

  useEffect(() => {
    setDisplayedRows(rows.slice(rowStartIdx, rowStartIdx + rowsPerPage));
  }, [rowStartIdx]);

  const handlePrevPage = () => {
    setRowStartIdx(rowStartIdx - rowsPerPage);
  };

  const handleNextPage = () => {
    setRowStartIdx(rowStartIdx + rowsPerPage);
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <Table
          className="routes-table"
          columns={columns}
          rows={displayedRows}
          perPage={rowsPerPage}
          format=""
        />
        <TableMessage
          firstN={rowStartIdx}
          totalRows={rows.length}
          perPage={rowsPerPage}
        />
        <TableNavBtns
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          prevDisabled={rowStartIdx === 0}
          nextDisabled={rowStartIdx + rowsPerPage >= rows.length}
        />
      </section>
    </div>
  );
};

export default App;
