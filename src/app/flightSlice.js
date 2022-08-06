import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getFlights,addFlight,delFlight,get_selected_flight} from '../api/flightAPI'

const initialState = {
  FlightAR: [],
  status: "idle",
};


export const getFlightAsync = createAsyncThunk(
  "flight/getFlights",
   async () => {
  const response = await getFlights();
  return response.data;
});

// call the methods in the API
export const addFlightAsync = createAsyncThunk(
  "flight/addFlight",
  async (newFlight) => {
    const response = await addFlight(newFlight);
    return response.data;
  }
);
// call the methods in the API
export const deleteFlightAsync = createAsyncThunk(
  "flight/deleteFlight",
  async (id) => {
    console.log(id);
    await delFlight(id.id);
    return id.id;
  }
);

export const get_selected_flightAsync = createAsyncThunk(
  "flight/get_selected_flight",
   async (origin_countrie_id,destination_countrie_id,fromTime,toTime) => {
  const response = await get_selected_flight(origin_countrie_id,destination_countrie_id,fromTime,toTime);
  console.log("async", response.data)
  return response.data;
});


export const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFlightAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFlightAsync.fulfilled, (state, action) => {
        state.FlightAR = action.payload;
      })
      .addCase(addFlightAsync.fulfilled, (state, action) => {
        state.FlightAR.push(action.payload);
      })
    //   .addCase(updCustomerAsync.fulfilled, (state, action) => {
    //     console.log(action.payload);
    //     let updCustomer = state.FlightAR.find(
    //       (customer) => customer.id === action.payload.id
    //     );
    //     updFlight.destination = action.payload.destination;
    //     updFlight.companyName = action.payload.companyName;
    //   }) 
        .addCase(deleteFlightAsync.fulfilled, (state, action) => {
          console.log(action.payload)
        state.FlightAR = state.FlightAR.filter(x=> x.id !==  action.payload);
      })
      .addCase(get_selected_flightAsync.fulfilled, (state, action) => {
        state.FlightAR = action.payload;
      });
  },
});

// export const {} = flightSlice.actions;
export const selectFlight = (state) => state.flight.FlightAR;
export default flightSlice.reducer;
