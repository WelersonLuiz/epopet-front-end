import React, { Component } from "react";

class Dashboard extends Component {
  state = {};

  handleLogout = () => {
    this.props.handleLogout()
    this.props.history.push("/");
  }
    
  render() {
    return (
      <div>
        <h1>Home</h1>
        <h1>You're logged in!</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <button onClick={() => this.handleLogout()}>Logout</button>
      </div>
    );
  }
}

export default Dashboard;
