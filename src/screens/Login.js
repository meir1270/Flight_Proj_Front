import React, { useState, useRef, useEffect, useContext } from 'react'
import './Login.css'
import axios from '../api/axios';
import { Link } from 'react-router-dom'
import AuthContext from "../context/AuthProvider";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";

const LOGIN_URL = '/token/';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef()
    const errRef = useRef()

    const [userName, setUserName] = useState("")
    const [user, setUser] = useState("")
    const [pwd, setPwd] = useState("")
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [staff, setStaff] = useState(false)
    const [superUser, setSuperUser] = useState(false)

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            // console.log(JSON.stringify(response.data));
            localStorage.setItem("access", response.data.access)
            setUserName(jwt_decode(response.data.access).username)
            setStaff(jwt_decode(response.data.access).is_staff)
            setSuperUser(jwt_decode(response.data.access).is_superuser)
            //console.log(JSON.stringify(response));
            const access = response.data.access;
            setAuth({ user, pwd, superUser, staff, access });
            setUser('');
            setPwd('');
            setSuccess(true);

        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 400) {
                setErrMsg('Wrong Username/password');
            } else if (err.response.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const getCustomers = async () => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`
        };
        await axios.get('http://127.0.0.1:8000/customers',
            { headers })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // const login = () => {
    //     axios.post(LOGIN_URL, {
    //         username: user,
    //         password: pwd
    //     })
    //         .then(function (response) {
    //             console.log(response.data.access);
    //             localStorage.setItem("access", response.data.access)
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }
    return (
        <div className='mainLogin'>
            {success ? (
                // <section>
                <div>
                    <br /> <br />
                    {superUser === true && <button onClick={() => getCustomers()}>get Customers</button>}
                    <h1>Welcome {userName} You are logged in!</h1>
                    {/* <Link to="/">Go back to Home</Link> */}

                    <Navigate to="/" replace={true} />
                </div>
                // </section>
            ) : (
                <section onSubmit={handleSubmit}>
                    <p ref={errRef} className={errMsg ? "errmsg" :
                        "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Login</h1>
                    <form>
                        <label htmlFor='username'> Username: </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Login</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            <Link to="/SignUp">Sign Up</Link>
                        </span>
                    </p>
                </section>
            )}

        </div >
    )
}

export default Login