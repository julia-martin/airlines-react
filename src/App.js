import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./components/Table";
import Select from "./components/Select";
import ClearFiltersBtn from "./components/ClearFiltersBtn";
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
    name: "All Airlines",
  },
};

const airportOptionConfig = {
  key: "code",
  value: "name",
  allOption: {
    value: "all",
    name: "All Airports",
  },
};

const App = () => {
  const [filteredRows, setFilteredRows] = useState(rows);
  const [filters, setFilters] = useState({ airline: "all", airport: "all" });

  const getEligibleAirlines = () => {
    return filteredRows
      .filter(
        (row) => filters.airline === "all" || row.airline === filters.airline
      )
      .map((row) => row.airline)
      .reduce((acc, elem) => {
        acc[elem] = true;
        return acc;
      }, {});
  };

  const getEligibleAirports = () => {
    return filteredRows
      .filter(
        (row) => filters.airport === "all" || row.airport === filters.airport
      )
      .map((row) => [row.src, row.dest])
      .reduce((acc, elem) => {
        acc[elem[0]] = true;
        acc[elem[1]] = true;
        return acc;
      }, {});
  };

  // When filters change, update filtered rows
  useEffect(() => {
    setFilteredRows(
      rows.filter((row) => {
        const matchesAirline =
          filters.airline === "all" || row.airline === filters.airline;
        const matchesAirport =
          filters.airport === "all" ||
          row.src === filters.airport ||
          row.dest === filters.airport;
        return matchesAirline && matchesAirport;
      })
    );
  }, [filters]);

  const handleSelection = () => {
    setFilters({
      airline: document.getElementById("airline").value,
      airport: document.getElementById("airport").value,
    });
  };

  const clearFilters = () => {
    setFilters({ airline: "all", airport: "all" });
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
            selected={filters.airline}
            id="airline"
            onSelect={handleSelection}
            options={airlines}
            optConfig={airlineOptionConfig}
            eligible={getEligibleAirlines()}
          />
          flying in or out of
          <Select
            selected={filters.airport}
            id="airport"
            onSelect={handleSelection}
            options={airports}
            optConfig={airportOptionConfig}
            eligible={getEligibleAirports()}
          />
          <ClearFiltersBtn
            handleClick={clearFilters}
            disabled={filteredRows.length === rows.length}
          >
            Show All Routes
          </ClearFiltersBtn>
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
