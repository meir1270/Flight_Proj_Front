import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCustomers,deleteCustomers,getCustomers } from "../api/customersAPI";

const initialState = {
  status: "idle",
  customersAR: [],
};

// call the methods in the API
export const getCustomersAsync = createAsyncThunk(
  "customers/getCustomers",
  async () => {
    const response = await getCustomers();
    return response.data;
  }
);

// call the methods in the API
export const addCustomersAsync = createAsyncThunk(
  "customers/addCustomers",
  async (newCustomers) => {
    const response = await addCustomers(newCustomers);
    return response.data;
  }
);
// call the methods in the API
export const deleteCustomersAsync = createAsyncThunk(
  "customers/deleteCustomers",
  async (id) => {
    console.log(id);
    await deleteCustomers(id.id);
    return id.id;
  }
);

// upd Customers (didnt do yet in back)

// // call the methods in the API
// export const updFlightAsync = createAsyncThunk(
//   "flight/updFlight",
//   async (newFlight) => {
//     let newBody = {
//       destination: newFlight.destination,
//       companyName: newFlight.companyName,
//     };
//     let id = newFlight.id;
//     const response = await updFlight(newBody, id);
//     return response.data;
//   }
// );

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCustomersAsync.fulfilled, (state, action) => {
        state.customersAR = action.payload;
      })
      .addCase(addCustomersAsync.fulfilled, (state, action) => {
        state.customersAR.push(action.payload);
        console.log(action.payload)
      })
    //   .addCase(updCustomerAsync.fulfilled, (state, action) => {
    //     console.log(action.payload);
    //     let updCustomer = state.customersAR.find(
    //       (customer) => customer.id === action.payload.id
    //     );
    //     updFlight.destination = action.payload.destination;
    //     updFlight.companyName = action.payload.companyName;
    //   }) 
        .addCase(deleteCustomersAsync.fulfilled, (state, action) => {
          console.log(action.payload)
        state.customersAR = state.customersAR.filter(x=> x.id !==  action.payload);
      });
  },
});

// export const {} = customersSlice.actions;
export const selectCustomers = (state) => state.customers.customersAR;
export default customersSlice.reducer;