import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTickets,deleteTickets,getTickets} from "../api/ticketsAPI";

const initialState = {
  status: "idle",
  ticketsAR: [],
};

// call the methods in the API
export const getTicketsAsync = createAsyncThunk(
  "tickets/getTickets",
  async () => {
    const response = await getTickets();
    console.log(response.data)
    return response.data;
  }
);

// call the methods in the API
export const addTicketsAsync = createAsyncThunk(
  "tickets/addTickets",
  async (newTickets) => {
    const response = await addTickets(newTickets);
    return response.data;
  }
);
// call the methods in the API
export const deleteTicketsAsync = createAsyncThunk(
  "tickets/deleteTickets",
  async (id) => {
    console.log(id);
    await deleteTickets(id.id);
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

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicketsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTicketsAsync.fulfilled, (state, action) => {
        state.ticketsAR = action.payload;
      })
      .addCase(addTicketsAsync.fulfilled, (state, action) => {
        state.ticketsAR.push(action.payload);
      })
    //   .addCase(updCustomerAsync.fulfilled, (state, action) => {
    //     console.log(action.payload);
    //     let updCustomer = state.customersAR.find(
    //       (customer) => customer.id === action.payload.id
    //     );
    //     updFlight.destination = action.payload.destination;
    //     updFlight.companyName = action.payload.companyName;
    //   }) 
        .addCase(deleteTicketsAsync.fulfilled, (state, action) => {
          console.log(action.payload)
        state.ticketsAR = state.ticketsAR.filter(x=> x.id !==  action.payload);
      });
  },
});

// export const {} = customersSlice.actions;
export const selectTickets = (state) => state.tickets.ticketsAR;
export default ticketsSlice.reducer;