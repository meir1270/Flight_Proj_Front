import React, { useEffect } from 'react'
import "./Flight.css"
import {selectFlight,getFlightAsync} from "../app/flightSlice";
import {  useSelector,useDispatch } from "react-redux";

const Flights = () => {
    const dispatch = useDispatch();
    const flight = useSelector(selectFlight);

    useEffect(() => {
        dispatch(getFlightAsync())
    }, [])
    

    // const getAllFLights = async () => {

    //     let res = await axios.get(FLIGHTS)
    //         .then(function (response) {
    //             console.log(response.data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

    return (
        <div>Flights <br /> 
            <p>you want to see all the flight we have?</p>
            {flight.length}
            {/* {flight.length > 0 && flight.map((flight) => <div key={flight.id}> {flight.airline_Companie.name}</div>)} */}
            {/* <button onClick={() => getAllFLights()}>get all flights</button> */}
        </div>
    )
}

export default Flights