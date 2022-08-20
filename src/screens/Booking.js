import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { selectYourFlight } from "../app/flightSlice";
import Table from 'react-bootstrap/Table';
import { selectUserName } from "../app/userSlice";
import { addCustomersAsync, selectCustomers,getCustomersAsync } from "../app/customersSlice";
import { addTicketsAsync } from "../app/ticketsSlice";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

const Booking = () => {
  const dispatch = useDispatch();
  const yourFlight = useSelector(selectYourFlight);
  const userName = useSelector(selectUserName);
  const myCustomers = useSelector(selectCustomers);

  const [first_name, setFirst_name] = useState("")
  const [last_name, setLast_name] = useState("")
  const [address, setAddress] = useState("")
  const [phone_No, setPhone_No] = useState("")
  const [credit_card_No, setCredit_card_No] = useState("")
  const [tickets, setTickets] = useState(0)
  // const [success, setSucsess] = useState(false)
  // const [customer, setCustomer] = useState("")
  const addCustomer = (first_name, last_name, address, phone_No, credit_card_No, tickets) => {
    let access = localStorage.getItem("access");
    const newCustomer = {
      first_name: first_name,
      last_name: last_name,
      address: address,
      phone_No: phone_No,
      credit_card_No: credit_card_No,
      user: jwt_decode(access).user_id
    }
    dispatch(addCustomersAsync(newCustomer))
    addTickets()
  }

  const addTickets = () => {
    let access = localStorage.getItem("access");
    let user = jwt_decode(access).user_id;
    console.log(myCustomers)
    let  customer_id=myCustomers.length > 0 && myCustomers
    .filter((x)=> x.user.id === user)
    .map(custo=>custo.id)
    console.log(user,customer_id)
    const newTickets = {
    customer_id: customer_id[0],
    flight_id: yourFlight.id,
    number_of_tickets: tickets,
    user: user
  }
  console.log(newTickets)
  dispatch(addTicketsAsync(newTickets))
}
useEffect(() => {
  dispatch(getCustomersAsync());
}, []);

return (
  <div>
    <br /><br />
    <h3>Hey {userName} Just a few more details to complete buying tickets</h3>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>AirLine</th>
          <th>origin countrie</th>
          <th>destination countrie</th>
          <th>departure time</th>
          <th>landing time</th>
          <th>remaining tickets</th>
        </tr>
      </thead>
      <tbody >
        <tr>
          <td>{yourFlight.airline_Companie_name} </td>
          <td>{yourFlight.origin_countrie}</td>
          <td>{yourFlight.destination_countrie}</td>
          <td>{yourFlight.departure_time}</td>
          <td>{yourFlight.landing_time}</td>
          <td>{yourFlight.remaining_tickets}</td>
        </tr>
      </tbody>
    </Table>
    <br /><br />
    <h3>Personal Information</h3>
    {/* {success === true && (myCustomers.length > 0 && myCustomers
        .filter((x) =>
          x.user.id === userID)
        .map((customer, i) => (
          <div key={i}>
            First Name:  <input onChange={(e) => setFirst_name(e.target.value)} value={customer.first_name}></input> <br />
            Last Name:&nbsp;<input onChange={(e) => setLast_name(e.target.value)} value={customer.last_name}></input> <br />
            Address:    &nbsp;&nbsp;&nbsp; <input onChange={(e) => setAddress(e.target.value)} value={customer.address}></input> <br />
            Phone: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input onChange={(e) => setPhone_No(e.target.value)} value={customer.phone_No}></input> <br />
            Credit card: <input onChange={(e) => setCredit_card_No(e.target.value)} value={customer.credit_card_No}></input> <br />
            <button onClick={() => addCustomer(first_name, last_name, address, phone_No, credit_card_No)}>Submit</button>
          </div>
        )))} */}

    <div>
      First Name:  <input onChange={(e) => setFirst_name(e.target.value)}></input> <br />
      Last Name:&nbsp;<input onChange={(e) => setLast_name(e.target.value)}></input> <br />
      Address:    &nbsp;&nbsp;&nbsp; <input onChange={(e) => setAddress(e.target.value)}></input> <br />
      Phone: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input onChange={(e) => setPhone_No(e.target.value)}></input> <br />
      Credit card: <input onChange={(e) => setCredit_card_No(e.target.value)}></input> <br />
      Number of passengers: <input type="number" min={1} max={5} onChange={(e) => setTickets(e.target.value)}></input> <br />
      <button onClick={() =>
        addCustomer(first_name, last_name, address, phone_No, credit_card_No, tickets)}>
        <Link to="/">Submit</Link>
      </button>
    </div>

    <br /><br />
  </div>
)
}

export default Booking