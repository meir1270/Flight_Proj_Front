import React, { useEffect, useState } from 'react'
import './Form.css';
// import { useDispatch,useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectCountrie,
  getCountrieAsync,
} from "../app/countrieSlice";
import { useSelector, useDispatch } from "react-redux";

const Form = () => {
  const myCountrie = useSelector(selectCountrie);
  const dispatch = useDispatch();

  const [fromCT, setFromCT] = useState(1)
  const [toCT, setToCT] = useState(0)
  const [departDate, setDepartDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  // const dispatch = useDispatch();
  // const myFlight = useSelector(selectedFlight);
  const [success, setSuccess] = useState(false);

  const searchFilght = (fromCT, toCT, departDate, returnDate) => {
    const newSelectedFly = {
      fromCT: fromCT,
      toCT: toCT,
      departDate: departDate,
      returnDate: returnDate,
    }
    localStorage.setItem("myFlight", JSON.stringify(newSelectedFly))
    setSuccess(true)
  }

  useEffect(() => {
    dispatch(getCountrieAsync());
  }, []);

  return (
    <div className='flightbooking'>
      {success ? (
        <div>
          <Navigate to="/myFlight" replace={true} />
        </div>
      ) : (
        <section>
          <h1>Search a Flight</h1>
          <label htmlFor='from'> From:  </label>
          <select name="from" id="from"
            onChange={(e) => setFromCT(e.target.value)}>
            {myCountrie.length > 0 && myCountrie.map((contrie, i) =>
              <option key={i} value={contrie.id}>{contrie.name}</option>
            )}</select>
          <label htmlFor='to'>  To: </label>
          <select name="to" id="to"
            onChange={(e) => setToCT(e.target.value)}>
            {myCountrie.length > 0 && myCountrie.map((contrie, i) =>
              <option key={i} value={contrie.id}>{contrie.name}</option>
            )}</select>

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
          <button onClick={() => searchFilght(fromCT, toCT, departDate, returnDate)}>Search </button>
        </section>
      )}
    </div>
  )
}
export default Form
