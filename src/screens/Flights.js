import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFlight,
  deleteFlightAsync,
  getFlightAsync,
} from "../app/flightSlice";
import '../App.css'
import Table from 'react-bootstrap/Table';

const Flight = () => {
  const myFlight = useSelector(selectFlight);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFlightAsync());
  }, []);

  return (
    <div>
      <br /><br /><br /><br />
      <br />We have {myFlight.length} Flight in my site
      <br /> <br />

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>AirLine</th>
            <th>origin countrie</th>
            <th>destination countrie</th>
            <th>departure time</th>
            <th>landing time</th>
            <th>remaining tickets</th>
            <th>Status</th>
            <th>price</th>
            <th> </th>
          </tr>
        </thead>
        {myFlight.length >0 && myFlight
          // .filter((x) =>
          // x.origin_countrie.includes(search))
          .map((flight, i) => (
            <tbody key={i}>
              <tr>
                <td>{flight.id}</td>
                <td>{flight.airline_Companie.name} </td>
                <td>{flight.origin_countrie.name}</td>
                <td>{flight.destination_countrie.name}</td>
                <td>{flight.departure_time.split("").filter((s, i) => i <= 15)}</td>
                <td>{flight.landing_time.split("").filter((s, i) => i <= 15)}</td>
                <td>{flight.remaining_tickets}</td>
                <td>{flight.status ? "available" : "unavailable"}</td>
                <td>{flight.price}$</td>
                <td>
                  <button onClick={() => dispatch(deleteFlightAsync({ id: flight.id }))} >
                    Delete</button>
                </td>
              </tr>
            </tbody>
          ))}
      </Table>
    </div>
  );
};

export default Flight;