import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCustomers,
  // addCustomersAsync,
  deleteCustomersAsync,
  getCustomersAsync,
} from "../app/customersSlice";
import '../App.css'
import Table from 'react-bootstrap/Table';

const Customers = () => {
  const myCustomers = useSelector(selectCustomers);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getCustomersAsync());
  }, []);

  return (
    <div>
      {/* add Customer */}
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
      <br />We have {myCustomers.length} Customers in my site


      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Adress</th>
          <th>Phone</th>
          <th>Credit Card</th>
          <th>Created Time</th>
          <th>User Name</th>
          <th>Email</th>
          <th></th>
          
        </tr>
      </thead>
      {myCustomers
      .filter((x) =>
      x.first_name.includes(search))
      .map((customer,i) => (
      <tbody key={i}>
        <tr>
          <td>{customer.id}</td>
          <td>{customer.first_name}</td>
          <td>{customer.last_name}</td>
          <td>{customer.address}</td>
          <td>{customer.phone_No}</td>
          <td>{customer.credit_card_No}</td>
          <td>{customer.createdTime.split("").filter((s,i) => i<=9)}</td>
          <td>{customer.user.username}</td>
          <td>{customer.user.email}</td>
          <td>
          <button onClick={() => dispatch(deleteCustomersAsync({ id: customer.id }))} >
              Delete</button>
          </td>
        </tr>
      </tbody>
      ))}
    </Table>
    </div>
  );
};

export default Customers;