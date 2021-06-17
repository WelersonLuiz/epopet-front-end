import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { NavBar } from "../../components/common";

class DashboardPage extends Component {
  state = {};

  handleLogout = () => {
    this.props.handleLogout();
    this.props.history.push("/");
  };

  render() {
    
    console.log("isLoggedIn ", window.$isLoggedIn);
    if (!window.$isLoggedIn) {
      console.log("Should Redirect ");
      return (<Redirect to={this.props.loginPath} />)
    };
    return (
      <div>
        <NavBar />

        <h1>Home</h1>
        <h1>You're logged in!</h1>
        <h1>Status: {window.$isLoggedIn}</h1>
        <button onClick={() => this.handleLogout()}>Logout</button>
      </div>
    );
  }
}

export default DashboardPage;
