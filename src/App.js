import React, { Component } from "react";
import "./App.css";
import Table from "./Table";

const App = () => {
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <Table className="routes-table" />
      </section>
    </div>
  );
};

export default App;
