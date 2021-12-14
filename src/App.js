import React, { Component } from "react";
import "./App.css";
import Table from "./Table";
// import data, { getAirlineById, getAirportByCode } from "./data.js";
// const { routes, airlines, airports } = data;

const columns = [
  {name: 'Airline', property: 'airline'},
  {name: 'Source Airport', property: 'src'},
  {name: 'Destination Airport', property: 'dest'},
];

function formatValue(property, value) {
  return "test"
}

const App = () => {
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <Table className="routes-table" columns={columns} rows="" format={formatValue}/>
      </section>
    </div>
  );
};

export default App;
