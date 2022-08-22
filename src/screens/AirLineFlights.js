import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    selectAirlineFlight,
    addFlightAsync,
    deleteFlightAsync,
    getFlightForAirlineAsync,
} from "../app/flightSlice";
import '../App.css'
import Table from 'react-bootstrap/Table';
import { selectUserName } from "../app/userSlice";
import jwt_decode from "jwt-decode";
import {
    selectCountrie,
    getCountrieAsync,
} from "../app/countrieSlice";
import Button from 'react-bootstrap/Button';
import {selectAirline_Companie, getairline_CompanieAsync,} 
    from "../app/airline_CompanieSlice";

const AirLineFlights = () => {
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    const myFlight = useSelector(selectAirlineFlight);
    const myCountrie = useSelector(selectCountrie);
    const myAirline_Companies = useSelector(selectAirline_Companie);

    const access = localStorage.getItem("access");

    const [origin_countrie, setOrigin_countrie] = useState(1)
    const [destination_countrie, setDestination_countrie] = useState(1)
    const [departure_time, setDeparture_time] = useState("")
    const [landing_time, setLanding_time] = useState("")
    const [remaining_tickets, setRemaining_tickets] = useState(0)
    const [search, setSearch] = useState("");
    const [price, setPrice] = useState(0)

    const addFlight = (origin_countrie, destination_countrie, departure_time, landing_time, remaining_tickets) => {
        let  airline_companie=myAirline_Companies.length > 0 && myAirline_Companies.filter((x)=> x.user.username === userName).map(airline=>airline.id)
        const newFlight = {
            airline_Companie_id: airline_companie[0],
            origin_countrie_id: origin_countrie,
            destination_countrie_id: destination_countrie,
            departure_time: departure_time,
            landing_time: landing_time,
            remaining_tickets: remaining_tickets,
            price: price,
            user: jwt_decode(access).user_id,
        }
        console.log(newFlight)
        dispatch(addFlightAsync(newFlight))
    }
    
    useEffect(() => {
        dispatch(getFlightForAirlineAsync());
        dispatch(getCountrieAsync());
        dispatch(getairline_CompanieAsync());
    }, []);
    return (
        <div>
            <br /><br /><br /><h4 style={{ textAlign: "center" }}>Hey {userName} you have {myFlight.length} Flight</h4>
            <br />
            <h6>Add a flight:</h6>
            {myAirline_Companies.filter((x)=> x.user.username === userName)
            .map((airline,i)=>
            <div key={i}>
                Airline Companie: <input type="text" value={airline.name} disabled></input><br />
                <label htmlFor="origin_countrie">Origin countrie:</label>
                <select name="origin_countrie" id="origin_countrie"
                    onChange={(e) => setOrigin_countrie(e.target.value)}>
                    {myCountrie.length > 0 && myCountrie.map((contrie, i) =>
                        <option key={i} value={contrie.id}>{contrie.name}</option>
                    )}</select> <br />
                <label htmlFor="destination_countrie">Destination countrie:</label>
                <select name="destination_countrie" id="destination_countrie"
                    onChange={(e) => setDestination_countrie(e.target.value)}>
                    {myCountrie.length > 0 && myCountrie.map((contrie, i) =>
                        <option key={i} value={contrie.id}>{contrie.name}</option>
                    )}</select> <br />
                Departure time: <input type="datetime-local" onChange={(e) => setDeparture_time(e.target.value)}></input> <br />
                Landing time: <input type="datetime-local" onChange={(e) => setLanding_time(e.target.value)}></input> <br />
                The number of tickets: <input type="number" min={1} max={300} onChange={(e) => setRemaining_tickets(e.target.value)}></input> <br />
                price for ticket: <input type="number" onChange={(e) => setPrice(e.target.value)}></input> <br />

                <Button variant="primary" onClick={() =>
                    addFlight(origin_countrie, destination_countrie, departure_time, landing_time, remaining_tickets)}>
                    Add flight</Button>
            </div> 
                )}<br /><br />
            Search by origin countrie: <input onChange={(e) => setSearch(e.target.value)} />
            <br /><br />
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
                {myFlight.length > 0 && myFlight
                    .filter((x) =>
                        x.origin_countrie.name.includes(search))
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
                                <Button variant="danger" onClick={() => dispatch(deleteFlightAsync({ id: flight.id }))} >
                                        Delete</Button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
            </Table>
        </div>
    );
};

export default AirLineFlights;