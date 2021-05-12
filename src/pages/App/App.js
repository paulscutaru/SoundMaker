import React, { useState, useEffect } from "react"
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import axios from "axios"
import "./App.css"
import Home from '../Home/Home'
import Login from '../Login/Login'
import Register from '../Register/Register'
import { AuthContext } from '../utils/AuthContext'

export default function App(props) {
  const [authState, setAuthState] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3001/auth/logged', {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then((response) => {
      if (response.data.error)
        setAuthState(false)
      else
        setAuthState(true)
    })
  }, [])

  return (
    <div className='App'>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <div className='Linker'>
            <img src='/images/logo-fii.png' alt="logo-fii.png" />
            <h3>FII UAIC 2021</h3>
            <Link to='/'>Login</Link>
            <Link to='/register'>Register</Link>
            {authState && (
              <Link to='/home'>Home</Link>
            )}
          </div>
          {authState && (
            <Route path="/home" exact component={Home} />
          )}
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );

}
