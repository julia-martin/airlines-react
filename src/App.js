import React, { useState, useEffect, Component } from "react";
import "./App.css";
import Table from "./components/Table";
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

const App = () => {
  const [ rowStartIdx, setRowStartIdx ] = useState(0);
  const [ displayedRows, setDisplayedRows ] = useState(rows.slice(0, 25));

  useEffect(() => {
    setDisplayedRows(rows.slice(rowStartIdx, rowStartIdx + 25));
  }, [rowStartIdx]);

  const handlePrevPage = () => {
    setRowStartIdx(rowStartIdx - 25);
  };

  const handleNextPage = () => {
    setRowStartIdx(rowStartIdx + 25);
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
          format=""
        />
        <TableNavBtns handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} />
      </section>
    </div>
  );
};

export default App;
