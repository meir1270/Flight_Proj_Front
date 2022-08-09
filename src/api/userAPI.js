import axios from "./axios";

const USERS_URL = "/users";

export function getUser() {
  const headers = { 
    'Authorization': `Bearer ${localStorage.getItem("access")}`
  };
  return new Promise((resolve) =>
    axios.get(USERS_URL, {headers}).then((res) => resolve({ data: res.data }))
  );
}

// export function addTickets(newTickets) {
//   const headers = { 
//     'Authorization': `Bearer ${localStorage.getItem("access")}`
//   };
//   return new Promise((resolve) =>
//     axios.post(ADD_USERS_URL,{headers}, newTickets).then((res) => resolve({ data: res.data }))
//   );
// }

export function deleteUser(id) {
  const headers = { 
    'Authorization': `Bearer ${localStorage.getItem("access")}`
  };
  return new Promise((resolve) =>
    axios.delete(USERS_URL + "/" + id,{headers}).then((res) => resolve({ data: res.data }))
  );
}

// update tickets (didnt do yet in back)

// export function updTickets(newTickets, id) {
//   return new Promise((resolve) =>
//     axios
//       .put(Tickets_URL + id, newTickets)
//       .then((res) => resolve({ data: res.data }))
//   );
// }