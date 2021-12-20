import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./components/Table";
import Select from "./components/Select";
import ClearFiltersBtn from "./components/ClearFiltersBtn";
import Map from "./components/Map";
import data, { getAirlineById, getAirportByCode } from "./data.js";
const { routes, airlines, airports } = data;

// Columns that correspond with route objects
const columns = [
  { name: "Airline", property: "airline" },
  { name: "Source Airport", property: "src" },
  { name: "Destination Airport", property: "dest" },
];

// Convert routes into format that can be used by the table and the map
const rows = routes.map((route) => {
  const { name: srcName, lat: srcLat, long: srcLong } = getAirportByCode(
    route.src,
    airports
  );
  const { name: destName, lat: destLat, long: destLong } = getAirportByCode(
    route.dest,
    airports
  );

  return {
    airline: {
      name: getAirlineById(route.airline, airlines).name,
      id: route.airline,
    },
    src: {
      name: srcName,
      lat: srcLat,
      long: srcLong,
      code: route.src,
    },
    dest: {
      name: destName,
      lat: destLat,
      long: destLong,
      code: route.dest,
    },
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

  const getEligible = (category) => {
    return filteredRows
      .filter(
        // returns array or rows that match the filter
        (row) =>
          filters[category] === "all" ||
          (category === "airline"
            ? row[category].name === filters[category]
            : row.src.name === filters[category])
      )
      .map((row) => {
        // returns array of strings, or returns array of arrays
        return category === "airline"
          ? row[category].name
          : [row.src.name, row.dest.name];
      })
      .reduce((acc, elem) => {
        // return object, example: {american airlines: true}
        if (typeof elem === "string") {
          return { ...acc, [elem]: true };
        } else if (Array.isArray(elem)) {
          return { ...acc, [elem[0]]: true, [elem[1]]: true };
        } else {
          return {};
        }
      }, {});
  };

  // When filters change, update filtered rows
  useEffect(() => {
    setFilteredRows(
      rows.filter((row) => {
        const matchesAirline =
          filters.airline === "all" || row.airline.name === filters.airline;
        const matchesAirport =
          filters.airport === "all" ||
          row.src.name === filters.airport ||
          row.dest.name === filters.airport;
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
        <Map routes={filteredRows} airlines={airlines} airports={airports} />
        <p>
          Show routes on
          <Select
            selected={filters.airline}
            id="airline"
            onSelect={handleSelection}
            options={airlines}
            optConfig={airlineOptionConfig}
            eligible={getEligible("airline")}
          />
          flying in or out of
          <Select
            selected={filters.airport}
            id="airport"
            onSelect={handleSelection}
            options={airports}
            optConfig={airportOptionConfig}
            eligible={getEligible("airport")}
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
