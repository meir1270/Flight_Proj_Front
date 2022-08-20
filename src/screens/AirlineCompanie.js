import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAirline_Companie,
  // addAirline_CompanieAsync,
  deleteAirline_CompanieAsync,
  getairline_CompanieAsync,
} from "../app/airline_CompanieSlice";
import '../App.css'
import Table from 'react-bootstrap/Table';

const AirlineCompanie = () => {
  const myAirline_Companies = useSelector(selectAirline_Companie);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getairline_CompanieAsync());
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
      Search by Airline Companies: <input onChange={(e) => setSearch(e.target.value)} />
      <br />We have {myAirline_Companies.length} airline Companies in my site
      <br/><br/>
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Company Name</th>
          <th>Countrie</th>
          <th>Created Time</th>
          <th>User Name</th>
          <th>Email</th>
          <th></th>
          
        </tr>
      </thead>
      {myAirline_Companies
      .filter((x) =>
      x.name.includes(search))
      .map((airline_Companie,i) => (
      <tbody key={i}>
        <tr>
          <td>{airline_Companie.id}</td>
          <td>{airline_Companie.name}</td>
          <td>{airline_Companie.countrie.name}</td>
          <td>{airline_Companie.createdTime.split("").filter((s,i) => i<=9)}</td>
          <td>{airline_Companie.user.username}</td>
          <td>{airline_Companie.user.email}</td>
          <td>
          <button onClick={() => dispatch(deleteAirline_CompanieAsync({ id: airline_Companie.id }))} >
              Delete</button>
          </td>
        </tr>
      </tbody>
      ))}
    </Table>
    </div>
  );
};

export default AirlineCompanie;