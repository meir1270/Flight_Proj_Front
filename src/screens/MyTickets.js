import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    selectMyTickets,
  getTicketsForUserAsync,
} from "../app/ticketsSlice";
import '../App.css'
import Table from 'react-bootstrap/Table';
import { selectUserName} from "../app/userSlice";

const MyTickets = () => {
  const myTickets = useSelector(selectMyTickets);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTicketsForUserAsync());
  }, []);

  return (
    <div>
      <br /><br /><br /><br />
      
      <h3 style={{textAlign:"center"}}>
      Hey {userName} you have {myTickets.length} Orders
      </h3>
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
        </tr>
      </thead>
      {myTickets.length >0 && myTickets
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
        </tr>
      </tbody>
      ))}
    </Table>
    </div>
  );
};

export default MyTickets;