import "./App.css";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// Pages
import LoginPage from "./pages/loginPage/LoginPage";
import DashboardPage from "./pages/dashboardPage/DashboardPage";
import RegistrationPage from "./pages/registrationPage/RegistrationPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import LandingPage from "./pages/landingPage/LandingPage";
import AboutPage from "./pages/aboutPage/AboutPage";
import PlanosPage from "./pages/plansPage/PlansPage";
import BusinessList from "./pages/BusinessList";
import Pets from "./pages/Pets";

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      isLoggedIn: false,
      user: {},
      routePaths: {
        login: "/login",
        registration: "/registration",
        dashboard: "/dashboard",
        notFound: "/404",
        about: "/nos",
        plans: "/planos",
        businessList: "/rede-referenciada",
        pets: "/pets"
      }
    };
  };

  handleLogin = (data) => {
    window.$isLoggedIn=true
    this.setState({
      user: data,
    });
  };

  handleLogout = () => {
    window.$isLoggedIn=false
    this.setState({
      user: {},
    });
    localStorage.setItem("loggedInStatus","NOT_LOGGED_IN")
  };
  
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <LandingPage {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route
              exact
              path={this.state.routePaths.about}
              render={(props) => (
                <AboutPage {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route
              exact
              path={this.state.routePaths.plans}
              render={(props) => (
                <PlanosPage {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route
              exact
              path={this.state.routePaths.pets}
              render={(props) => (
                <Pets 
                  {...props} 
                   handleLogin={this.handleLogin} 
                   loggedInStatus={this.state.loggedInStatus}
                   loginPath={this.state.routePaths.login}
                   User = {this.state.user}
                />
              )}
            />
            <Route
              exact
              path={this.state.routePaths.login}
              render={(props) => (
                <LoginPage 
                  {...props} 
                  dashboardPath={this.state.routePaths.dashboard}
                  handleLogin={this.handleLogin} 
                />
              )}
            />
            <Route
              exact
              path={this.state.routePaths.dashboard}
              render={(props) => (
                <DashboardPage
                  {...props}
                  handleLogout={this.handleLogout}
                  isLoggedIn={this.state.isLoggedIn}
                  loginPath={this.state.routePaths.login}
                  User = {this.state.user}
                />
              )}
            />
            <Route
              exact
              path={this.state.routePaths.registration}
              render={(props) => (
                <RegistrationPage {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route
              exact
              path={this.state.routePaths.businessList}
              render={(props) => (
                <BusinessList {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route
              exact
              path={this.state.routePaths.notFound}
              component={NotFoundPage}
            />
            <Redirect to={this.state.routePaths.notFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
