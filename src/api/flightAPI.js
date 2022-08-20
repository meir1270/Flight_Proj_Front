import axios from "./axios";

const FLIGHTS = "/flight"
const ADD_FLIGHTS = "/addflight"
const DELETE_FLIGHTS = "/deleteflight/"
const SELECTED_FLIGHTS = "/selectflight/"
const AIRLINE_FLIGHTS = "/airlineflights"


export function getFlights() {
  return new Promise((resolve) =>
    axios.get(FLIGHTS).then((res) => resolve({ data: res.data }))
  );
}

export function addFlight(newFlight) {
  const headers = { 
    'Authorization': `Bearer ${localStorage.getItem("access")}`
  };
  return new Promise((resolve) =>
    axios.post(ADD_FLIGHTS,newFlight,{headers}).then((res) => resolve({ data: res.data }))
  );
}

export function delFlight(id) {
  const headers = { 
    'Authorization': `Bearer ${localStorage.getItem("access")}`
  };
  return new Promise((resolve) =>
    axios.delete(DELETE_FLIGHTS + id, {headers}).then((res) => resolve({ data: res.data }))
  );
}

//   const res = await axios.put('/api/article/123', {
//     title: 'Making PUT Requests with Axios',
//     status: 'published'
// });

// createAsyncThunk -> updProd-> createAsyncThunk -> extra

// fromCT,toCT,departDate,returnDate
export function get_selected_flight(SelectedFlight) {
  return new Promise((resolve) =>
    axios.get(`${SELECTED_FLIGHTS+SelectedFlight.fromCT}/${SelectedFlight.toCT}/${SelectedFlight.departDate}/${SelectedFlight.returnDate}`)
    .then((res) => resolve({ data: res.data }))
  );
}

export function getFlightForAirline() {
  const headers = { 
    'Authorization': `Bearer ${localStorage.getItem("access")}`
  };
  return new Promise((resolve) =>
    axios.get(AIRLINE_FLIGHTS,{headers}).then((res) => resolve({ data: res.data }))
  );
}
