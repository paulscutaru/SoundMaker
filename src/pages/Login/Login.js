import React, { useState } from "react";
import axios from "axios";
import './Login.css'

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        const data = { username: username, password: password };
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            console.log(response.data);
        });
    };

    return (
        <div className="login-container">
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

            <button onClick={login}> Login </button>
        </div>
    );
};
