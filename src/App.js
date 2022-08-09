import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { useDispatch } from 'react-redux';
import {checkLogin} from './app/loggedSlice'
import {checkUser} from './app/userSlice'
import Customers from './screens/Customers';
import AirlineCompanie from './screens/AirlineCompanie';
import Countrie from './screens/Countrie';
import Flight from './screens/Flights';
import Tickets from './screens/Tickets';
import Setting from './screens/Setting';
import Users from './screens/Users';
import MyFlight from './components/MyFlight';
// import {checkSelectedFlight} from "./app/flightSlice";
import Booking from './components/Booking';

function App() {
  const dispatch = useDispatch();
    
  useEffect(() => {
      dispatch(checkLogin())
      dispatch(checkUser())
      // dispatch(checkSelectedFlight())
  }, [])
  return (
    <div>
      <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/airlineCompanie" element={<AirlineCompanie />} />
            <Route path="/countrie" element={<Countrie />} />
            <Route path="/flights" element={<Flight />} />
            <Route path="/users" element={<Users />} />
            <Route path="/MyFlight" element={<MyFlight />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
