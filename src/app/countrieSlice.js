import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCountrie,deleteCountrie,getCountrie} from "../api/countrieAPI";

const initialState = {
  status: "idle",
  countrieAR: [],
};

// call the methods in the API
export const getCountrieAsync = createAsyncThunk(
  "countrie/getCountrie",
  async () => {
    const response = await getCountrie();
    return response.data;
  }
);

// call the methods in the API
export const addCountrieAsync = createAsyncThunk(
  "countrie/addCountrie",
  async (newCountrie) => {
    const response = await addCountrie(newCountrie);
    return response.data;
  }
);
// call the methods in the API
export const deleteCountrieAsync = createAsyncThunk(
  "countrie/deleteCountrie",
  async (id) => {
    console.log(id);
    await deleteCountrie(id.id);
    return id.id;
  }
);

// upd Countrie (didnt do yet in back)

// // call the methods in the API
// export const updCountrieAsync = createAsyncThunk(
//   "countrie/updCountrie",
//   async (newCountrie) => {
//     let newBody = {
//       destination: newCountrie.destination,
//       companyName: newCountrie.companyName,
//     };
//     let id = newCountrie.id;
//     const response = await updCountrie(newBody, id);
//     return response.data;
//   }
// );

export const CountrieSlice = createSlice({
  name: "countrie",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountrieAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCountrieAsync.fulfilled, (state, action) => {
        state.countrieAR = action.payload;
      })
      .addCase(addCountrieAsync.fulfilled, (state, action) => {
        state.countrieAR.push(action.payload);
      })
    //   .addCase(updCustomerAsync.fulfilled, (state, action) => {
    //     console.log(action.payload);
    //     let updCustomer = state.customersAR.find(
    //       (customer) => customer.id === action.payload.id
    //     );
    //     updFlight.destination = action.payload.destination;
    //     updFlight.companyName = action.payload.companyName;
    //   }) 
        .addCase(deleteCountrieAsync.fulfilled, (state, action) => {
          console.log(action.payload)
        state.countrieAR = state.countrieAR.filter(x=> x.id !==  action.payload);
      });
  },
});

// export const {} = CountrieSlice.actions;
export const selectCountrie = (state) => state.countrie.countrieAR;
export default CountrieSlice.reducer;