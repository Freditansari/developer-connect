import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";


//redux component
import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import {
  clearCurrentProfile,
  setProfileLoading
} from "./actions/profileActions";

import PrivateRoute from "./common/privateRoute";
import EditProfile from "./components/edit-profile/EditProfile";

//check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));

  //checking for expired token.
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    /*todo : clear current profile*/
    store.dispatch(clearCurrentProfile());

    //redirect to login
    window.location.href = "/login";
  }
}

// const store = createStore(()=>[], {}, applyMiddleware());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />


              {/* example of private route component */}
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              {/* example of private route component */}

              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
