import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
};

export const loggedSlice = createSlice({
    name: "logged",
    initialState,
    reducers: {
        login: (state) => {
            state.value = true;
        },
        checkLogin: (state) => {
            let myToken = localStorage.getItem("access");
            if (myToken) {
              state.value = true;
            }
          },
          logout: (state) => {
            localStorage.removeItem("access");
            state.value = false;
          },
    }
});

export const { login, logout,checkLogin} = loggedSlice.actions;
export const selectLog = (state) => state.logged.value;
export default loggedSlice.reducer;
