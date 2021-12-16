import React, { useState } from "react";
import "./App.css";
import Table from "./components/Table";
import Select from './components/Select';
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

const airlineOptionConfig = {
  key: "id",
  value: "name",
  allOption: {
    value: "all",
    name: "All Airlines"
  }
}

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
          <Select
            id="airline"
            onSelect={handleSelection}
            options={airlines}
            optConfig={airlineOptionConfig}
          />
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
