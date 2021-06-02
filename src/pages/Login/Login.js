import React, { useState, useContext } from "react";
import axios from "axios";
import './Login.css'
import { useHistory } from 'react-router-dom';
import Logo from '../../components/Logo/Logo'
import { AuthContext } from '../utils/AuthContext'
/*https://github.com/machadop1407/FullStack-Course/tree/Episode14*/

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { setAuthState } = useContext(AuthContext)

    var history = useHistory()

    const login = () => {
        const data = { username: username, password: password };
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            }
            else {
                localStorage.setItem('token', response.data.token)
                setAuthState({ username: response.data.username, id: response.data.id, logged: true })
                console.log('Token:', response.data)
                history.push('/')
            }
        });
    };

    return (
        <div className="login-container">
            <Logo />
            <h2>Login</h2>
            <label>Username:</label>
            <input
                type="text"
                onChange={(event) => {
                    setUsername(event.currentTarget.value);
                }}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(event) => {
                    setPassword(event.currentTarget.value);
                }}
            />

            <button className='submit-button' onClick={login}>Login</button>
        </div>
    );
};
