import React, { Component } from "react";
import "./App.css";
import data, { getAirlineById, getAirportByCode } from "./data.js";
const { routes, airlines, airports } = data;

const App = () => {
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <table>
          <thead>
            <tr>
              <th>Airline</th>
              <th>Source Airport</th>
              <th>Destination Airport</th>
            </tr>
          </thead>
          <tbody>
            {routes.map(({ airline, src, dest }) => {
              const airlineObj = getAirlineById(airline, airlines);
              const srcAirport = getAirportByCode(src, airports);
              const destAirport = getAirportByCode(dest, airports);

              return (
                <tr>
                  <td>{airlineObj.name}</td>
                  <td>{srcAirport.name}</td>
                  <td>{destAirport.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default App;
