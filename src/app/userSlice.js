import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { deleteUser,getUser} from "../api/userAPI";

const initialState = {
    username: "",
    is_staff: false,
    is_superuser: false,
    access: "",
    userAR : [],
    user_id:0
};


// call the methods in the API
export const getUserAsync = createAsyncThunk(
    "user/getUser",
    async () => {
      const response = await getUser();
      return response.data;
    }
  );
  
// call the methods in the API
export const deleteUserAsync = createAsyncThunk(
    "user/deleteUser",
    async (id) => {
      console.log(id);
      await deleteUser(id.id);
      return id.id;
    }
  );
  
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        set_is_staff: (state, action) => {
            state.is_staff = action.payload;
        },
        set_user_id: (state, action) => {
          state.user_id = action.payload;
      },
        set_is_superuser: (state, action) => {
            state.is_superuser = action.payload;
        },
        Set_userName: (state, action) => {
            state.username = action.payload;
        },
        Set_access: (state, action) => {
            state.access = action.payload;
        },
        checkUser: (state) => {
            let myToken = localStorage.getItem("access");
            if (myToken) {
                state.username = jwt_decode(myToken).username;
                state.is_staff = jwt_decode(myToken).is_staff;
                state.is_superuser = jwt_decode(myToken).is_superuser;
                state.user_id = jwt_decode(myToken).user_id;
            }
          },
          clearUser: (state) => {
            state.username = "";
            state.is_staff = false;
            state.is_superuser = false;
            }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getUserAsync.fulfilled, (state, action) => {
            state.userAR = action.payload;
          })
        //   .addCase(addTicketsAsync.fulfilled, (state, action) => {
        //     state.ticketsAR.push(action.payload);
        //   })
        //   .addCase(updCustomerAsync.fulfilled, (state, action) => {
        //     console.log(action.payload);
        //     let updCustomer = state.customersAR.find(
        //       (customer) => customer.id === action.payload.id
        //     );
        //     updFlight.destination = action.payload.destination;
        //     updFlight.companyName = action.payload.companyName;
        //   }) 
            .addCase(deleteUserAsync.fulfilled, (state, action) => {
              console.log(action.payload)
            state.userAR = state.userAR.filter(x=> x.id !==  action.payload);
          });
      },
});

export const { set_is_staff, set_is_superuser, Set_userName, Set_access,checkUser,clearUser,set_user_id } = userSlice.actions;
export const selectUserName = (state) => state.user.username;
export const selectStaff = (state) => state.user.is_staff;
export const selectSuperUser = (state) => state.user.is_superuser;
export const selectAccess = (state) => state.user.access;
export const selectUserId = (state) => state.user.user_id;
export const selectUser = (state) => state.user.userAR;

export default userSlice.reducer;
