import React, { Component } from "react";

class Dashboard extends Component {
  state = {};

  handleLogout = () => {
    this.props.handleLogout()
    this.props.history.push("/");
  }
  isLogged(){
    if (this.props.loggedInStatus === "NOT_LOGGED_IN"){
      this.props.history.push("/")
    }
  }
  render() {
    this.isLogged()
    return (
      <div>
        <h1>Home</h1>
        <h1>You're logged in!</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        {console.log('step 1')}
        {console.log(this.props)}
        <button onClick={() => this.handleLogout()}>Logout</button>
        <button onClick={() => this.props.history.push("/pets")}>Pets</button>
      </div>
    );
  }
}

export default Dashboard;
