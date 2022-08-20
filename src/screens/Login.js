import React, { useState, useRef, useEffect } from 'react'
import './Login.css'
import axios from '../api/axios';
import { Link } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { login,} from "../app/loggedSlice";
import {
    set_is_staff,
    set_is_superuser,
    Set_userName,
    Set_access,
     set_user_id,
} from "../app/userSlice";

const LOGIN_URL = '/token/';

const Login = () => {
    const dispatch = useDispatch();

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState("")
    const [pwd, setPwd] = useState("")
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
 
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
            const access = response.data.access;
            localStorage.setItem("access", access)
            dispatch(login())
            dispatch(Set_userName(jwt_decode(response.data.access).username))
            dispatch(set_is_staff(jwt_decode(response.data.access).is_staff))
            dispatch(set_user_id(jwt_decode(response.data.access).user_id))
            dispatch(set_is_superuser(jwt_decode(response.data.access).is_superuser))
            dispatch(Set_access(access))

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

    return (
        <div className='mainLogin'>
            {success ? (
                <div>
                    <Navigate to="/" replace={true} />
                </div>
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