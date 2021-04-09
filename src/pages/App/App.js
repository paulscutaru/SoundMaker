import React from "react"
import "./App.css"

import Home from '../Home/Home'
import Login from '../Login/Login'
import Register from '../Register/Register'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
//import useToken from './useToken';

export default function App(props) {
  //const { token, setToken } = useToken();

  /*if(!token){
    return <Login setToken={setToken} />
  }*/

  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
        <div className='Linker'>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
          <Link to='/home'>Home</Link>
        </div>
      </BrowserRouter>
    </div>
  );

}
