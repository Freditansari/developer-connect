import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';


import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';





class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Navbar />
          <Route exact path='/' component ={Landing}></Route>
          <div className="container">
          <Route exact path ='/register' component = {Register}></Route>
          <Route exact path ='/login' component = {Login}></Route>

          </div>
        <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
