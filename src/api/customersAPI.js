import axios from "./axios";

const CUSTOMERS_URL = "/customers";
const ADD_CUSTOMER_URL = "/addcustomer";

export function getCustomers() {
  const headers = { 
    'Authorization': `Bearer ${localStorage.getItem("access")}`
  };
  return new Promise((resolve) =>
    axios.get(CUSTOMERS_URL, {headers}).then((res) => resolve({ data: res.data }))
  );
}

export function addCustomers(newCustomers) {
  const headers = { 
    'Authorization': `Bearer ${localStorage.getItem("access")}`
  };
  return new Promise((resolve) =>
    axios.post(ADD_CUSTOMER_URL,newCustomers,{headers}).then((res) => resolve({ data: res.data }))
  );
}

export function deleteCustomers(id) {
  const headers = { 
    'Authorization': `Bearer ${localStorage.getItem("access")}`
  };
  return new Promise((resolve) =>
    axios.delete(CUSTOMERS_URL + "/" + id,{headers}).then((res) => resolve({ data: res.data }))
  );
}

// update customer (didnt do yet in back)

// export function updCustomers(newCustomers, id) {
//   return new Promise((resolve) =>
//     axios
//       .put(CUSTOMERS_URL + id, newCustomers)
//       .then((res) => resolve({ data: res.data }))
//   );
// }