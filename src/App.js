import "./App.css";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Registration from "./pages/Registration";
import PageNotFound from "./pages/PageNotFound";
import noLoginPage from "./pages/noLoginPage";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      routePaths: {
        login: "/login",
        registration: "/registration",
        dashboard: "/dashboard",
        notFound: "/404",
      },
    };
  }

  handleLogin = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data,
    });
  };

  handleLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              Component={noLoginPage}
            />
            <Route
              exact
              path={this.state.routePaths.login}
              render={(props) => (
                <Login 
                  {...props} 
                   handleLogin={this.handleLogin} 
                />
              )}
            />
            <Route
              exact
              path={this.state.routePaths.dashboard}
              render={(props) => (
                <Dashboard
                  {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path={this.state.routePaths.registration}
              render={(props) => (
                <Registration
                  {...props}
                  handleLogin={this.handleLogin} 
                />
              )}
            />
            <Route
              exact
              path={this.state.routePaths.notFound}
              component={PageNotFound}
            />
            <Redirect to={this.state.routePaths.notFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
