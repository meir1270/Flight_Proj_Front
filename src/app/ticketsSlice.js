import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTickets,deleteTickets,getTickets,getTicketsForUser} from "../api/ticketsAPI";

const initialState = {
  status: "idle",
  ticketsAR: [],
  myTicketsAR:[],
  newTicketsAR: [],
};

// call the methods in the API
export const getTicketsAsync = createAsyncThunk(
  "tickets/getTickets",
  async () => {
    const response = await getTickets();
    return response.data;
  }
);

// call the methods in the API
export const getTicketsForUserAsync = createAsyncThunk(
  "tickets/getTicketsForUser",
  async () => {
    const response = await getTicketsForUser();
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
    saveNewTickets: (state, action) => {
      state.newTicketsAR = action.payload
    },
    updNewTickets: (state, action) => {
      state.newTicketsAR = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicketsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTicketsForUserAsync.fulfilled, (state, action) => {
        state.myTicketsAR = action.payload;
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

export const {saveNewTickets,updNewTickets} = ticketsSlice.actions;
export const selectTickets = (state) => state.tickets.ticketsAR;
export const selectMyTickets = (state) => state.tickets.myTicketsAR;
export const selectnewTickets = (state) => state.tickets.newTicketsAR;
export default ticketsSlice.reducer;