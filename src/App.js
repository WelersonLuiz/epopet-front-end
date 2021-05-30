import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom"

// Pages
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import Registration from "./pages/Registration";
import PageNotFound from './pages/PageNotFound';


const ApplicationRoutes = {
  registration: "/registration",
  dashboard: "/dashboard",
  notFound: "/404"
}

class App extends Component {
  
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };
  }
  
  handleLogin = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data
    });
  }
  
  handleLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  }
  
	render(){
		return (
			<div className="App">
        <Router>
          <Switch>
            <Route 
              exact path="/"
              render={props => (
                  <Login
                    {...props}
                    handleLogin={this.handleLogin}
                  />
              )}
            />
            <Route 
              exact path={ApplicationRoutes.dashboard}
              render={props => (
                <Dashboard
                  {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route exact path={ApplicationRoutes.registration} component={Registration}/>
            <Route exact path={ApplicationRoutes.notFound} component={PageNotFound}/>
            <Redirect to={ApplicationRoutes.notFound}/>
          </Switch>
        </Router>
			</div>
		);	
	}
}

export default App;
