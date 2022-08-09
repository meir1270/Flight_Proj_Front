import React from 'react'
import {selectLog} from "../app/loggedSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from '../screens/Login';

const Booking = () => {
    const dispatch = useDispatch(); 
    const log = useSelector(selectLog);

  return (
    <div>
        <br /><br /><br /><br /><br />
        first you need to login 
        <Login />
        Booking
        
        </div>
  )
}

export default Booking