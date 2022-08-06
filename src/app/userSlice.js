import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
const initialState = {
    username: "",
    is_staff: false,
    is_superuser: false,
    access: "",

};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        set_is_staff: (state, action) => {
            state.is_staff = action.payload;
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
            }
          },
          clearUser: (state) => {
            state.username = "";
            state.is_staff = false;
            state.is_superuser = false;
            }
    }
});

export const { set_is_staff, set_is_superuser, Set_userName, Set_access,checkUser,clearUser } = userSlice.actions;
export const selectUserName = (state) => state.user.username;
export const selectStaff = (state) => state.user.is_staff;
export const selectSuperUser = (state) => state.user.is_superuser;
export const selectAccess = (state) => state.user.access;

export default userSlice.reducer;
