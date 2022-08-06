import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFlight,
  // addFlightAsync,
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
      {/* add Flight */}
      {/* <div style={{ backgroundColor: "cyan" }}>
        admin area.... Company
        <input onChange={(e) => setCompanyName(e.target.value)} />
        Destination
        <input onChange={(e) => setDestination(e.target.value)} />
        <button
          onClick={() =>
            dispatch(
              addFlightAsync({
                companyName: companyName,
                destination: destination,
              })
            )
          }
        >
          Add Flight
        </button>
      </div> */}
      <br /><br /><br /><br />
      <br />We have {myFlight.length} Flight in my site


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