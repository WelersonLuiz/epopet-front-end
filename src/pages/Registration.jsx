import React, { Component } from "react";
import axios from "axios";

class Registration extends Component {
  
  constructor(props) {
    super(props);

    this.input = {
      email: "",
      password: "",
      password_confirmation: ""
    };
  }
  
  handleRegister = () => {
    const { email, password } = this.state;
    
    let body = {
      email: email,
      password: password
    }
    
    console.log("Call with ", body);
    axios.post(
      "http://localhost:8080/client",
      body
    )
    .then(response => {
      console.log("register response", response);
      if (response.status === 200) {
        this.props.handleLogin(response.data);
        this.props.history.push("/dashboard");
      }
    })
    .catch(error => {
      console.log("register error", error);
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  render() {
    return (
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={this.handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.handleChange}
          required
        />

        <input
          type="password"
          name="password_confirmation"
          placeholder="Password confirmation"
          onChange={this.handleChange}
          required
        />

        <button onClick={this.handleRegister} className="btn btn-secondary btn-sm">Register</button>
      </div>
    );
  }
}

export default Registration;