import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import "./Login.css"
import {Header} from './common'

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
        if (response.data.email === '' || response.data.password === ''){
          return 
        }
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
    


    return (
      
        <div className='container'>
          <div>
            <Link to="/">
              <div className='container_login_imagem'>
                <div className='container_login_imagem_img'></div>
              </div>
            </Link>
          <div className='container_login_form'>
            <div className='container_login_form_welcome'>
              <h3>Bem vindo</h3>
            </div>
            <Form className='container_login_form_preenche'>
              <Form.Label>Conecte sua conta</Form.Label>
                  <Form.Group >
                    <Form.Group controlId="formBasicEmail">
                      
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
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
                        className="botao_login"
                      >Login
                      </Button>
                    </Form.Group>
                    
                    <Link to="/registration" className='criar_conta'>Criar sua conta</Link>

                    <Link to="/registration" className='esqueceu_senha'>Esqueceu sua senha?</Link>
                  </Form.Group>
             </Form>

            </div>
          </div>
          </div>
    );
  }
}

export default Login;
