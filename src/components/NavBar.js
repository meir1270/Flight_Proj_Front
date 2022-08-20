import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import {logout,selectLog} from "../app/loggedSlice";
import {selectSuperUser,selectStaff,clearUser} from "../app/userSlice";
import {  useSelector,useDispatch } from "react-redux";
import axios from '../api/axios';

const LOGOUT_URL = '/logout';

const NavBar = () => {
    const dispatch = useDispatch();
    const log = useSelector(selectLog);
    const staff = useSelector(selectStaff);
    const superUser = useSelector(selectSuperUser);
    
    const log_out = async () =>{
        const headers = { 
            'Authorization': `Bearer ${localStorage.getItem("access")}`
        };
        let res = await axios.get(LOGOUT_URL,
        { headers })
        dispatch(logout())
        dispatch(clearUser())
        console.log(res.data)
    }
    return (
        <div className='navBar'>
            <ul>
                <li><Link to="/">Home</Link></li>
                {superUser === true && <li><Link to="/customers">Customers</Link></li>}
                {superUser === true && <li><Link to="/airlineCompanie">AirLines</Link></li>}
                {superUser === true && <li><Link to="/countrie">Countries</Link></li>}
                {superUser === true && <li><Link to="/flights">Flights</Link></li>}
                {superUser === true && <li><Link to="/tickets">Tickets</Link></li>}
                {superUser === true && <li><Link to="/users">Users</Link></li>}
                {log === true && superUser === false && staff === false && <li><Link to="/myTickets">My tickets</Link></li>}
                {log === true && superUser === false && staff === true && <li><Link to="/AirLineFlights">My Flights</Link></li>}
                {log === true && <li onClick={() => log_out()} style={{ float: "right" }}><Link to="/Login">Logout</Link></li>}
                {log === true && <li style={{ float: "right" }}><Link to="/settings">Settings</Link></li>}
                {log === false && <li style={{ float: "right" }}><Link to="/Login">Login</Link></li>}
                {log === false && <li style={{ float: "right" }}><Link to="/SignUp">SignUp</Link></li>}
            </ul>
        </div>
    )
}

export default NavBar