import React from "react"
import "./App.css"

import Home from '../Home/Home'
import Login from '../Login/Login'
import Register from '../Register/Register'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Linker from '../../components/Linker/Linker'

export default function App(props) {

  return (
    <div className='App'>
      <BrowserRouter>
        <Linker />
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </BrowserRouter>
    </div>
  );

}
