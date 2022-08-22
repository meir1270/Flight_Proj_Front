import axios from "./axios";

const TICKET_URL = "/tickets";
const ADD_TICKET_URL = "/addtickets";
const USER_TICKET_URL = "/usertickets";
const DELETE_TICKET_URL = "/deletetickets/";

export function getTickets() {
  const headers = { 
    'Authorization': `Bearer ${localStorage.getItem("access")}`
  };
  return new Promise((resolve) =>
    axios.get(TICKET_URL, {headers}).then((res) => resolve({ data: res.data }))
  );
}

export function addTickets(newTickets) {
  const headers = { 
    'Authorization': `Bearer ${localStorage.getItem("access")}`
  };
  return new Promise((resolve) =>
    axios.post(ADD_TICKET_URL,newTickets,{headers}).then((res) => resolve({ data: res.data }))
  );
}

export function deleteTickets(id) {
  const headers = { 
    'Authorization': `Bearer ${localStorage.getItem("access")}`
  };
  return new Promise((resolve) =>
    axios.delete(DELETE_TICKET_URL+id,{headers}).then((res) => resolve({ data: res.data }))
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

export function getTicketsForUser() {
  const headers = { 
    'Authorization': `Bearer ${localStorage.getItem("access")}`
  };
  return new Promise((resolve) =>
    axios.get(USER_TICKET_URL, {headers}).then((res) => resolve({ data: res.data }))
  );
}
