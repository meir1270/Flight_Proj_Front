import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAirline_Companie,deleteAirline_Companie,getAirline_Companie} from "../api/airline_CompanieAPI";

const initialState = {
  status: "idle",
  airline_CompanieAR: [],
};

// call the methods in the API
export const getairline_CompanieAsync = createAsyncThunk(
  "airline_Companie/getAirline_Companie",
  async () => {
    const response = await getAirline_Companie();
    return response.data;
  }
);

// call the methods in the API
export const addAirline_CompanieAsync = createAsyncThunk(
  "airline_Companie/addAirline_Companie",
  async (newAirline_Companie) => {
    const response = await addAirline_Companie(newAirline_Companie);
    return response.data;
  }
);
// call the methods in the API
export const deleteAirline_CompanieAsync = createAsyncThunk(
  "airline_Companie/deleteAirline_Companie",
  async (id) => {
    console.log(id);
    await deleteAirline_Companie(id.id);
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

export const airline_CompanieSlice = createSlice({
  name: "airline_Companie",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getairline_CompanieAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getairline_CompanieAsync.fulfilled, (state, action) => {
        state.airline_CompanieAR = action.payload;
      })
      .addCase(addAirline_CompanieAsync.fulfilled, (state, action) => {
        state.airline_CompanieAR.push(action.payload);
      })
    //   .addCase(updCustomerAsync.fulfilled, (state, action) => {
    //     console.log(action.payload);
    //     let updCustomer = state.customersAR.find(
    //       (customer) => customer.id === action.payload.id
    //     );
    //     updFlight.destination = action.payload.destination;
    //     updFlight.companyName = action.payload.companyName;
    //   }) 
        .addCase(deleteAirline_CompanieAsync.fulfilled, (state, action) => {
          console.log(action.payload)
        state.customersAR = state.customersAR.filter(x=> x.id !==  action.payload);
      });
  },
});

// export const {} = customersSlice.actions;
export const selectAirline_Companie = (state) => state.airline_Companie.airline_CompanieAR;
export default airline_CompanieSlice.reducer;