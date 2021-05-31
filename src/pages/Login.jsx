import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Login extends Component {
  constructor(props) {
    super(props);

    this.input = {
      email: "",
      password: "",
      loginErrors: "",
    };
  }

  handleLogin = () => {
    const { email, password } = this.state;

    axios
      .get("http://localhost:8080/client/email/" + email)
      .then((response) => {
        if (response.data.password === password) {
          this.props.handleLogin(response.data);
          this.props.history.push("/dashboard");
        }
      })
      .catch((error) => {
        console.log("Login error", error);
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    
    const centerChildStyle = {
      display: "flex",
      justifyContent: "center",
    }

    return (
      <div style={centerChildStyle}>
        <Form >
          
          <Form.Group >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicButton">
              <Button
                onClick={this.handleLogin}
                className="btn btn-secondary btn-sm"
              >
                Submit
              </Button>
            </Form.Group>
            
            <Link to="/registration">Create an account</Link>
          </Form.Group>
        
        </Form>
      </div>
    );
  }
}

export default Login;
