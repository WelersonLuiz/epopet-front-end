import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

class Login extends Component {

  constructor(props) {
    super(props);

    this.input = {
      email: "",
      password: "",
      loginErrors: ""
    };
  }
  
  handleLogin = () => {
    const { email, password } = this.state;

    axios.get(
        "http://localhost:8080/client/email/" + email
      )
      .then(response => {
        if (response.data.password === password) {
          this.props.handleLogin(response.data);
          this.props.history.push("/dashboard");
        }
      })
      .catch(error => {
        console.log("Login error", error);
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

        <button onClick={this.handleLogin} className="btn btn-secondary btn-sm">Login</button>
      
        <br />
        <div>
          <Link to="/registration">Create an account</Link>            
        </div>
      </div>
    );
  }
}

export default Login;