import axios from "./axios";

const COUNTRIE_URL = "/countrie";
const ADD_COUNTRIE_URL = "/addcountrie";
const DELETE_COUNTRIE_URL = "/deletecountrie";


export function getCountrie() {
  return new Promise((resolve) =>
    axios.get(COUNTRIE_URL,).then((res) => resolve({ data: res.data }))
  );
}

export function addCountrie(newCountrie) {
  const headers = { 
    'Authorization': `Bearer ${localStorage.getItem("access")}`
  };
  return new Promise((resolve) =>
    axios.post(ADD_COUNTRIE_URL, newCountrie,{headers}).then((res) => resolve({ data: res.data }))
  );
}

export function deleteCountrie(id) {
  const headers = { 
    'Authorization': `Bearer ${localStorage.getItem("access")}`
  };
  return new Promise((resolve) =>
    axios.delete(DELETE_COUNTRIE_URL + "/" + id,{headers}).then((res) => resolve({ data: res.data }))
  );
}

// update countrie (didnt do yet in back)

// export function updCountrie(newCountrie, id) {
//   return new Promise((resolve) =>
//     axios
//       .put(COUNTRIE_URL + id, newCountrie)
//       .then((res) => resolve({ data: res.data }))
//   );
// }