import React, { useState, useEffect } from 'react'
import "./myFlight.css"
import { get_selected_flightAsync, selectedFlight} from "../app/flightSlice";
import { useSelector, useDispatch } from "react-redux";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";

const MyFlight = () => {
    const dispatch = useDispatch();
    const myFlight = useSelector(selectedFlight);
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(get_selected_flightAsync())
    }, [])

    return (
        <div>
            <br /><br /><br /><br />
            Search by name: <input onChange={(e) => setSearch(e.target.value)} />
            <br />We have flight {myFlight.length} as you requested
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
                        <th> </th>
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
                                <td><Link to="/booking">Booking</Link></td>
                            </tr>
                        </tbody>
                    ))}
            </Table>
        </div>
    )
}

export default MyFlight