import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Nav from './components/Nav/Nav.js'
import Dashboard from './components/Dashboard/Dashboard.js'
import Landing from './components/Landing/Landing.js'
import Signin from './components/SignIn/SignIn'

function App() {
  return (
    <div className="App">
      <Nav/>
        <Route exact path="/" component={Landing}/>
        <Route path="/login" component={Signin}/>
        <Route path="/dashboard" component={Dashboard}/>
    </div>
  );
}

export default App;
