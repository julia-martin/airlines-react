import React, { useState } from "react";
import "./App.css";
import Table from "./components/Table";
import Select from './components/Select';
import ClearFiltersBtn from './components/ClearFiltersBtn';
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

const airportOptionConfig = {
  key: "code",
  value: "name",
  allOption: {
    value: "all",
    name: "All Airports"
  }
}

const App = () => {
  const [filteredRows, setFilteredRows] = useState(rows);


  const handleSelection = () => {
    const airlineFilter = document.getElementById("airline").value;
    const airportFilter = document.getElementById("airport").value;

    setFilteredRows(
      rows.filter((row) => {
        const matchesAirline =
          airlineFilter === "all" || row.airline === airlineFilter;
        const matchesAirport =
          airportFilter === "all" ||
          row.src === airportFilter ||
          row.dest === airportFilter;

        return matchesAirline && matchesAirport;
      })
    );
  };

  const clearFilters = () => {
    setFilteredRows(rows);
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
          flying in or out of
          <Select
            id="airport"
            onSelect={handleSelection}
            options={airports}
            optConfig={airportOptionConfig}
          />
          <ClearFiltersBtn handleClick={clearFilters} disabled={filteredRows.length === rows.length}>Show All Routes</ClearFiltersBtn>
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
