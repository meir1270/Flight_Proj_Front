import axios from "./axios";

const FLIGHTS = "/flight"
const ADD_FLIGHTS = "/addflight"
const DELETE_FLIGHTS = "/deleteflight/"
const SELECTED_FLIGHTS = "/selectflight/"


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
    axios.post(ADD_FLIGHTS, {headers},newFlight).then((res) => resolve({ data: res.data }))
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


export function get_selected_flight(origin_countrie_id,destination_countrie_id,fromTime,toTime) {
  return new Promise((resolve) =>
    axios.get(`${SELECTED_FLIGHTS} ${origin_countrie_id}/${destination_countrie_id}/${fromTime}/${toTime}`).then((res) => resolve(console.log({ data: res.data })))
  );
}
