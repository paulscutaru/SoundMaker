/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import axios from "axios"
import "./App.css"
import Home from '../Home/Home'
import Login from '../Login/Login'
import Register from '../Register/Register'
import PageNotFound from '../PageNotFound/PageNotFound'
import { AuthContext } from '../utils/AuthContext'

export default function App(props) {
  const [authState, setAuthState] = useState(
    {
      username: "",
      id: 0,
      logged: false
    }
  )

  useEffect(() => {
    axios.get('http://localhost:3001/auth/logged', {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then((response) => {
      if (response.data.error)
        setAuthState({ ...authState, logged: false })
      else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          logged: true
        })
      }
    })
  }, [])

  function logout() {
    localStorage.removeItem('token')
    setAuthState({
      username: "",
      id: 0,
      logged: false
    })
  }


  return (
    <div className='App'>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <div className='Linker'>
            <img src='/images/logo-fii.png' alt="logo-fii.png" />
            <h3>FII UAIC 2021</h3>
            {authState.logged ? (
              <>
                <h3 className='username'>@{authState.username}</h3>
                <button className='button-logout' onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link to='/'>Login</Link>
                <Link to='/register'>Register</Link>
              </>)}
          </div>
          {authState.logged ? (
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="*" exact component={PageNotFound} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="*" exact component={PageNotFound} />
            </Switch>)}
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );

}
