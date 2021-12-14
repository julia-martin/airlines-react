import React from "react";
import data, { getAirlineById, getAirportByCode } from "./data.js";
const { routes, airlines, airports } = data;

const Table = ({ columns }) => {
  return (
    <table>
          <thead>
            <tr>
            {columns.map(({ name }) => {
              return (
                <th>{name}</th>
              )
            })}
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
  )
}

export default Table;