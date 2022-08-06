import React, {  useState } from 'react'
import './Form.css';
import {get_selected_flightAsync,selectFlight} from "../app/flightSlice";
import {  useSelector,useDispatch } from "react-redux";

const Form = () => {
  const [fromCT, setFromCT] = useState("")
  const [toCT, setToCT] = useState("")
  const [departDate, setDepartDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const dispatch = useDispatch();
  const [myFlight, setMyFlight] = useState([])
  const searchFilght = () => {
    dispatch(get_selected_flightAsync(fromCT,toCT,departDate,returnDate))
    console.log(fromCT,toCT,departDate,returnDate)
  }

  return (
    <div className='flightbooking'>
      <section>
        <h1>Search for a Flight</h1>
        <form>
          <label htmlFor='from'> From:  </label>
          <input
            type="text"
            id="from"
            onChange={(e) => setFromCT(e.target.value)}
            value={fromCT}
            aria-describedby="from"
          />
          <label htmlFor='to'>  To: </label>
          <input
            type="text"
            id="to"
            onChange={(e) => setToCT(e.target.value)}
            value={toCT}
            aria-describedby="to"
          />
          <label htmlFor='departdate'> Depart:  </label>
          <input
            type="date"
            id="departdate"
            onChange={(e) => setDepartDate(e.target.value)}
            value={departDate}
            aria-describedby="departdate"
          />
          <label htmlFor='returnDate'> Return:  </label>
          <input
            type="date"
            id="returnDate"
            onChange={(e) => setReturnDate(e.target.value)}
            value={returnDate}
            aria-describedby="returnDate"
          />
          <button onClick={() => searchFilght()}>Search </button>
        </form>
      </section>
      {myFlight.lengtht}
    </div>
  )
}
export default Form