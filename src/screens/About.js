import React from 'react'
import './About.css'
import {selectLog} from "../app/loggedSlice";
import { useSelector } from 'react-redux';
import {selectSuperUser,selectStaff} from "../app/userSlice";
import { ContactUs } from '../components/ContactUs ';

const About = () => {
    const log = useSelector(selectLog);
    const staff = useSelector(selectStaff);
    const superUser = useSelector(selectSuperUser);

    return (
        <div>
            <br /><br /><br /><br />
            <p>
                Hello everyone my name is Meir Mavashov and I 22 years old. <br />
                I am a Junior Full stack developer at the beginning of my path I am currently studying at <br />
                John bryce College Full Stack python Course.<br />
                In this project i present a flight management system that allows airline companies to advertise flights <br />
                and for customers to choose the one that suits them the best at an attractive price.<br />
                In this project we also have an admin side that can manage the system.
            </p>
            <br/> <br/> <br/>
            {log  === true && staff  === false &&  superUser  === false && 
             <p className='contact'>
                want to become airline company?<br/>
                </p>}
             <p className='contact'>contact us now</p>
            <ContactUs />
        </div>
    )
}

export default About
