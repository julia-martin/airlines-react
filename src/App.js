import React, { Component } from 'react';
import './App.css';
import data from './data.js';
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
              return (<tr>
                <td>{airline}</td>
                <td>{src}</td>
                <td>{dest}</td>
                </tr>)
              })}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default App;
