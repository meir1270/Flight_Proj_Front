import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import jwt_decode from "jwt-decode";

const NavBar = () => {
    return (
        <div className='navBar'>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li style={{ float: "right" }}><Link to="/Login">Login</Link></li>
                <li style={{ float: "right" }}><Link to="/SignUp">SignUp</Link></li>
            </ul>
        </div>
    )
}

export default NavBar