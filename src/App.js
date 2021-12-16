import React, { useState } from "react";
import "./App.css";
import Table from "./components/Table";
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
  const [filteredRows, setFilteredRows] = useState(rows);

  const handleSelection = (e) => {
    const airlineFilter = document.getElementById("airline").value;

    setFilteredRows(
      rows.filter((row) => {
        const matchesAirline =
          airlineFilter === "all" || row.airline === airlineFilter;

        return matchesAirline;
      })
    );
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Show routes on
          <select id="airline" onChange={handleSelection}>
            <option value="all">All Airlines</option>
            {airlines.map((airline) => {
              return (
                <option key={airline.id} value={airline.name}>
                  {airline.name}
                </option>
              );
            })}
          </select>
        </p>
        <Table
          className="routes-table"
          columns={columns}
          rows={filteredRows}
          perPage={rowsPerPage}
          format=""
        />
      </section>
    </div>
  );
};

export default App;
