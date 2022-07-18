import React, { useEffect, useState } from 'react'
import Body from '../components/Body'
import HeroSection from '../components/HeroSection'
import jwt_decode from "jwt-decode";

const Home = () => {
  const [userName, setUserName] = useState("")
  const [superUser, setSuperUser] = useState(false)
  const [staff, setStaff] = useState(false)

  // useEffect(() => {
  //   const access = localStorage.getItem("access")
  //   setUserName(jwt_decode(access).username)
  //   setStaff(jwt_decode(access).is_staff)
  //   setSuperUser(jwt_decode(access).is_superuser)
  // }, [])

  // const access = localStorage.getItem("access")
  // setUserName(jwt_decode(access).username)
  // setStaff(jwt_decode(access).is_staff)
  // setSuperUser(jwt_decode(access).is_superuser)

  return (
    <div>
      {superUser === true && <h1><br />Welcome {userName} You are logged in!</h1>}
      <div>
        <HeroSection />
      </div>
      <Body />
    </div>
  )
}

export default Home