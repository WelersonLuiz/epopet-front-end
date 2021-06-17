import React, { Component } from "react";
import axios from "axios";

class Pets extends Component {
  state = {};

  componentPet = () => {
    axios
      .get("http://localhost:8080/pet")
      .then((response) => {
        console.log("register response", response);
        this.setState({ petList: response.data });
      })
      .catch((error) => {
        console.log("register error", error);
      });
  };
  render() {
    this.componentPet();
    this.componentPet();

    return (
      <div>
        <h1>Home</h1>
        <h1>You're logged in!</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <button onClick={() => this.handleLogout()}>Logout</button>
        <h1></h1>
      </div>
    );
  }
}

export default Pets;
