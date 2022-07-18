import React, { useState } from 'react'
import './Form.css';
import axios from '../api/axios'

const FLIGHTS_URL = '/addflight'

const Form = () => {
  const [fromCT, setFromCT] = useState("")
  const [toCT, setToCT] = useState()
  const [departDate, setDepartDate] = useState()
  const [returnDate, setReturnDate] = useState()

  const habdleSubmit = async (e) => {
    try {
      const response = await axios.post(FLIGHTS_URL,
        JSON.stringify({ fromCT: fromCT, toCT: toCT, departDate: departDate, returnDate: returnDate }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <div className='flightbooking'>
     <section>
        <h1>Search for a Flight</h1>
        <form onSubmit={habdleSubmit}>
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
          <button onClick={() => habdleSubmit()}>Search </button>
        </form>
      </section>
    </div>
  )
}
export default Form