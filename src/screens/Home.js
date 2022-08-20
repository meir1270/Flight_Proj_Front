import React from 'react'
import Body from '../components/Body'
import HeroSection from '../components/HeroSection'
import { useSelector } from "react-redux";
import { selectLog } from "../app/loggedSlice";
import { selectUserName} from "../app/userSlice";


const Home = () => {
  const log = useSelector(selectLog);
  const userName = useSelector(selectUserName);


  return (
    <div>
      {log === true && <h1><br />Welcome {userName}, you are logged in!</h1>}
      <div>
        <HeroSection />
      </div>
      <Body />
    </div>
  )
}

export default Home