import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFlights, addFlight, delFlight, get_selected_flight,getFlightForAirline } from '../api/flightAPI'

const initialState = {
  FlightAR: [],
  status: "idle",
  selectedFlightAR: [],
  yourFlight: [],
  airlineFlightsAR:[],
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
    await delFlight(id.id);
    return id.id;
  }
);

// call the methods in the API
export const getFlightForAirlineAsync = createAsyncThunk(
  "flight/getFlightAsynForAirline",
  async () => {
    const response = await getFlightForAirline();
    return response.data;
  }
);

// upd flight (didnt do yet in back)

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

// fromCT,toCT,departDate,returnDate
export const get_selected_flightAsync = createAsyncThunk(
  "flight/get_selected_flight",
  async () => {
    let myFlight = JSON.parse(localStorage.getItem("myFlight"))
    if (myFlight) {
      const response = await get_selected_flight(myFlight);
      return response.data;
    }
  });


export const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    checkSelectedFlight: (state) => {
      // let myFlight = localStorage.getItem("yourFlight");
      // if (myFlight) {
      //   state.yourFlight = myFlight
      // }
    },
    saveSelectedFlight: (state, action) => {
      state.yourFlight = action.payload
      // localStorage.setItem("yourFlight", JSON.stringify(state.yourFlight));
    }
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
        state.airlineFlightsAR.push(action.payload);
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
        state.FlightAR = state.FlightAR.filter(x => x.id !== action.payload);
        state.airlineFlightsAR = state.airlineFlightsAR.filter(x => x.id !== action.payload);

      })
      .addCase(get_selected_flightAsync.fulfilled, (state, action) => {
        state.selectedFlightAR = action.payload;
      })
      .addCase(getFlightForAirlineAsync.fulfilled, (state, action) => {
        state.airlineFlightsAR = action.payload;
      });
  },
});

export const { checkSelectedFlight, saveSelectedFlight } = flightSlice.actions;
export const selectFlight = (state) => state.flight.FlightAR;
export const selectedFlight = (state) => state.flight.selectedFlightAR;
export const selectYourFlight = (state) => state.flight.yourFlight;
export const selectAirlineFlight = (state) => state.flight.airlineFlightsAR;
export default flightSlice.reducer;
