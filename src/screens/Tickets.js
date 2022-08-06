import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTickets,
    // addTicketsAsync,
  deleteTicketsAsync,
  getTicketsAsync,
} from "../app/ticketsSlice";
import '../App.css'
import Table from 'react-bootstrap/Table';

const Tickets = () => {
  const myTickets = useSelector(selectTickets);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getTicketsAsync());
  }, []);

  return (
    <div>
      {/* add Tickets */}
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
          Add flight
        </button>
      </div> */}
      <br /><br /><br /><br />
      Search by name: <input onChange={(e) => setSearch(e.target.value)} />
      <br /><br />We have {myTickets.length} customers that have Tickets in my site
      <br /><br /><br /><br />
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer Name</th>
          <th>AirLine</th>
          <th>Origin Countrie</th>
          <th>Destination Countrie</th>
          <th>Departure Time</th>
          <th>Landing Time</th>
          <th>Tickets</th>
          <th>Phone</th>
          <th>Email</th>
          <th></th>
          
        </tr>
      </thead>
      {myTickets
      .filter((x) =>
      x.customer.first_name.includes(search))
      .map((tickets,i) => (
      <tbody key={i}>
        <tr>
          <td>{tickets.id}</td>
          <td>{tickets.customer.first_name} {tickets.customer.last_name}</td>
          <td>{tickets.flight.airline_Companie.name}</td>
          <td>{tickets.flight.origin_countrie.name}</td>
          <td>{tickets.flight.destination_countrie.name}</td>
          <td>{tickets.flight.departure_time.split("").filter((s, i) => i <= 15)}</td>
          <td>{tickets.flight.landing_time.split("").filter((s, i) => i <= 15)}</td>
          <td>{tickets.number_of_tickets}</td>
          <td>{tickets.customer.phone_No}</td>
          <td>{tickets.customer.user.email}</td>

          <td>
          <button onClick={() => dispatch(deleteTicketsAsync({ id: tickets.id }))} >
              Delete</button>
          </td>
        </tr>
      </tbody>
      ))}
    </Table>
    </div>
  );
};

export default Tickets;