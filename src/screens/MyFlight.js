import React, { useState, useEffect } from 'react'
import { get_selected_flightAsync, selectedFlight, saveSelectedFlight } from "../app/flightSlice";
import { useSelector, useDispatch } from "react-redux";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { selectLog } from "../app/loggedSlice";

const MyFlight = () => {
    const dispatch = useDispatch();
    const myFlight = useSelector(selectedFlight);
    const [search, setSearch] = useState("");
    const log = useSelector(selectLog);

    useEffect(() => {
        dispatch(get_selected_flightAsync())
    }, [])

    const saveFlight = (flight) => {
        let yourFlight = {
            id:flight.id,
            airline_Companie_name:flight.airline_Companie.name,
            origin_countrie:flight.origin_countrie.name,
            destination_countrie:flight.destination_countrie.name,
            departure_time:flight.departure_time,
            landing_time:flight.landing_time,
            remaining_tickets:flight.remaining_tickets,
            price:flight.price
          }
        dispatch(saveSelectedFlight(yourFlight))
    }

    return (
        <div>
            <br /><br />
            {log === false && <h4 style={{ textAlign: "center" }}> you must Login to booking a flight </h4>}
            <br /><br />
            Search by AirLine Companie: <input onChange={(e) => setSearch(e.target.value)} />
            <br />We have {myFlight.length} flight as you requested
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
                        <th>price</th>
                        <th>  </th>
                    </tr>
                </thead>
                {myFlight
                    .filter((x) =>
                        x.airline_Companie.name.includes(search))
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
                                <td>{flight.price}$</td>
                                <td>
                                {!log ? (
                                    <button onClick={() =>saveFlight(flight)}>
                                        <Link to="/Login">Booking</Link>
                                    </button>
                                ) : (
                                    <button onClick={() =>saveFlight(flight)}>
                                        <Link to={"/booking"}>Booking</Link>
                                    </button>
                                )}
                                </td>
                            </tr>
                        </tbody>
                    ))}
            </Table>
            <br/><br/><br/><br/>
        </div>
    )
}

export default MyFlight