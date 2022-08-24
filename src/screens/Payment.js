import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { selectnewTickets } from '../app/ticketsSlice';
import { selectYourFlight } from "../app/flightSlice";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { addTicketsAsync } from "../app/ticketsSlice";
import './Payment.css'

const Payment = () => {
    const dispatch = useDispatch();
    const myTickets = useSelector(selectnewTickets);
    const yourFlight = useSelector(selectYourFlight);

    const addTickets = () =>{
        console.log(myTickets)
        dispatch(addTicketsAsync(myTickets));
    }

    return (
        <div>
            <br /><br />
            <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>AirLine</th>
            <th>origin countrie</th>
            <th>destination countrie</th>
            <th>departure time</th>
            <th>landing time</th>
            <th>passengers</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody >
          <tr>
            <td>{yourFlight.airline_Companie_name} </td>
            <td>{yourFlight.origin_countrie}</td>
            <td>{yourFlight.destination_countrie}</td>
            <td>{yourFlight.departure_time}</td>
            <td>{yourFlight.landing_time}</td>
            <td>{myTickets.number_of_tickets}</td>
            <td>{yourFlight.price*myTickets.number_of_tickets}$</td>
          </tr>
        </tbody>
      </Table>
        <div className='body-container'>
            <div className="container">
                <h1>Confirm Your Payment</h1>
                <div className="first-row">
                    <div className="owner">
                        <h3>Owner</h3>
                        <div className="input-field">
                            <input type="text"></input>
                        </div>
                    </div>
                    <div className="cvv">
                        <h3>CVV</h3>
                        <div className="input-field">
                            <input type="password"></input>
                        </div>
                    </div>
                </div>
                <div className="second-row">
                    <div className="card-number">
                        <h3>Card Number</h3>
                        <div className="input-field">
                            <input type="text"></input>
                        </div>
                    </div>
                </div>
                <div className="third-row">
                    <h3>Card Number</h3>
                    <div className="selection">
                        <div className="date">
                            <select name="months" id="months">
                                <option value="Jan">Jan</option>
                                <option value="Feb">Feb</option>
                                <option value="Mar">Mar</option>
                                <option value="Apr">Apr</option>
                                <option value="May">May</option>
                                <option value="Jun">Jun</option>
                                <option value="Jul">Jul</option>
                                <option value="Aug">Aug</option>
                                <option value="Sep">Sep</option>
                                <option value="Oct">Oct</option>
                                <option value="Nov">Nov</option>
                                <option value="Dec">Dec</option>
                            </select>
                            <select name="years" id="years">
                                <option value="2027">2027</option>
                                <option value="2026">2026</option>
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                            </select>
                        </div>
                        <div className="cards">
                            <img src="/static/mc.png" alt="12"></img>
                            <img src="/static/vi.png" alt="3"></img>
                            <img src="/static/pp.png" alt="4"></img>
                        </div>
                    </div>
                </div>
                <button className='a-container' onClick={() =>
                    addTickets()}> <Link to="/myTickets">Submit</Link></button>
            </div>
        </div>
        </div>
    )
}
 
export default Payment
