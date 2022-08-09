import React, {  useState } from 'react'
import './Form.css';
import {get_selected_flightAsync,selectedFlight} from "../app/flightSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const Form = () => {
  const [fromCT, setFromCT] = useState(1)
  const [toCT, setToCT] = useState(2)
  const [departDate, setDepartDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const dispatch = useDispatch();
  const myFlight = useSelector(selectedFlight);
  const [success, setSuccess] = useState(false);

  const searchFilght = (fromCT,toCT,departDate,returnDate) => {
    const newSelectedFly = {
      fromCT:fromCT,
      toCT:toCT,
      departDate:departDate,
      returnDate:returnDate,
    }
    dispatch(get_selected_flightAsync(newSelectedFly))
    // localStorage.setItem("myFlight", JSON.stringify(myFlight))
    setSuccess(true)
  }

  return (
    <div className='flightbooking'>
      {success ? (
                <div>
                    <Navigate to="/myFlight" replace={true} />
                </div>
            ) : (
      <section>
        <h1>Search for a Flight</h1>
          <label htmlFor='from'> From:  </label>
          <input
            type="text"
            id="from"
            onChange={(e) => setFromCT(e.target.value)}
            value={fromCT}
            required
            aria-describedby="from"
          />
          <label htmlFor='to'>  To: </label>
          <input
            type="text"
            id="to"
            onChange={(e) => setToCT(e.target.value)}
            value={toCT}
            required
            aria-describedby="to"
          />
          <label htmlFor='departdate'> Depart:  </label>
          <input
            type="date"
            id="departdate"
            onChange={(e) => setDepartDate(e.target.value)}
            value={departDate}
            required
            aria-describedby="departdate"
          />
          <label htmlFor='returnDate'> Return:  </label>
          <input
            type="date"
            id="returnDate"
            onChange={(e) => setReturnDate(e.target.value)}
            value={returnDate}
            required
            aria-describedby="returnDate"
          />
          <button onClick={() => searchFilght(fromCT,toCT,departDate,returnDate)}>Search </button>
      </section>
       )}
    </div>
  )
}
export default Form