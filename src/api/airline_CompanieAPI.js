import axios from "./axios";

const AIRLINE_COMPANIE_URL = "/airline_Companie";
const ADD_airline_Companie_URL = "/addairline_Companie";

export function getAirline_Companie() {
  const headers = { 
    'Authorization': `Bearer ${localStorage.getItem("access")}`
  };
  return new Promise((resolve) =>
    axios.get(AIRLINE_COMPANIE_URL, {headers}).then((res) => resolve({ data: res.data }))
  );
}

export function addAirline_Companie(newAirline_Companie) {
  const headers = { 
    'Authorization': `Bearer ${localStorage.getItem("access")}`
  };
  return new Promise((resolve) =>
    axios.post(ADD_airline_Companie_URL, newAirline_Companie,{headers}).then((res) => resolve({ data: res.data }))
  );
}

export function deleteAirline_Companie(id) {
  const headers = { 
    'Authorization': `Bearer ${localStorage.getItem("access")}`
  };
  return new Promise((resolve) =>
    axios.delete(AIRLINE_COMPANIE_URL + "/" + id,{headers}).then((res) => resolve({ data: res.data }))
  );
}

// update customer (didnt do yet in back)

// export function updAirline_Companie(newAirline_Companie, id) {
//   return new Promise((resolve) =>
//     axios
//       .put(AIRLINE_COMPANIE_URL + id, newAirline_Companie)
//       .then((res) => resolve({ data: res.data }))
//   );
// }