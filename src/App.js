import "./App.css";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink,
} from "react-router-dom";

import Routes from "./components/routes"

import { AuthProvider} from "./components/authContext"
import history from "./components/history"

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
      user: {},
    };
  }

  handleLogin = (data) => {
    window.$isLoggedIn = true;
    this.setState({
      user: data,
    });
  };

  handleLogout = () => {
    window.$isLoggedIn = false;
    this.setState({
      user: {},
    });
  };

  render() {
    return (<AuthProvider>
              <Router history={history}>
                <Routes/>
              </Router>
            </AuthProvider>)
  }
}

export default App;
