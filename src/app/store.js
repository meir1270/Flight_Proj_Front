import { configureStore } from '@reduxjs/toolkit';
import loggedReducer from './loggedSlice';
import userReducer from './userSlice';
import flightReducer from './flightSlice';
import customersReducer from './customersSlice';
import airline_CompanieReducer from './airline_CompanieSlice';
import countrieReducer from './countrieSlice';
import ticketsReducer from './ticketsSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        flight: flightReducer,
        logged: loggedReducer,
        customers : customersReducer,
        airline_Companie : airline_CompanieReducer,
        countrie : countrieReducer,
        tickets : ticketsReducer
    }
});
