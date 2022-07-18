import React, { useState } from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode";

const Test = () => {
    const [user, setuser] = useState("")
    const [pwd, setPwd] = useState("")
    const DJANGO ='http://127.0.0.1:8000/token/'


    const login = () =>{
        axios.post(DJANGO, {
            username: user,
            password: pwd
          })
          .then(function (response) {
            console.log(response.data.access);
            localStorage.setItem("access",response.data.access)
          })
          .catch(function (error) {
            console.log(error);
          });  
        }

        const getCustomers=async()=>{
            const headers = { 
                'Authorization': `Bearer ${localStorage.getItem("access")}`
            };
            axios.get('http://127.0.0.1:8000/customers',
                { headers })
                .then(function (response) {
                console.log(response.data);
                console.log(jwt_decode(localStorage.getItem("access")))
              })
              .catch(function (error) {
                console.log(error);
              });
              // let username = jwt_decode(localStorage.getItem("access").username)

        }

  return (
    <div>
        {/* Hello {username} */}
       username:<input onChange={(e) => setuser(e.target.value)}></input> <br/>
       passward:<input onChange={(e) => setPwd(e.target.value)} type={'password'}></input>  <br/>
    <button onClick={() => login()}>login</button>
    <button onClick={() => getCustomers()}>get Customers</button>
    </div>
  )
}

export default Test