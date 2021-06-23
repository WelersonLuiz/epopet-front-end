import React, { Component,useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { Link } from "react-router-dom";
import "./LoginPage.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import logo_login from "../../images/login_image.png";
import {Context} from "../../components/authContext"

const crypto = require('crypto');

function LoginPage(props){
  const {authenticated,handleLogin,user} = useContext(Context)

  if(authenticated){
        return (<Redirect {...props} to={props.dashboardPath}/>)
  }

  console.debug('Login',authenticated)
  console.debug('token',localStorage.getItem('token'))
  console.debug('user',user)
  var input = {
    email : '',
    password : ''
  }
  function handleChange(e){
    e.preventDefault()
    if(e.target.name === 'password'){
      // input[e.target.name]= crypto.createHash('sha1').update(e.target.value).digest('hex')
      input[e.target.name]= e.target.value
    }else{
    input[e.target.name]= e.target.value
  }
}
  async function handleFormCompleted(){

    await handleLogin(input);
    console.debug("No botão",authenticated)
    if(authenticated){
      console.log('Aqui')
      console.log(props.dashboardPath)
      return <Redirect to={props.dashboardPath} />
    }else{
      return
    }
  }


  return (
          <div className="container">
            <div>
              <Link to="/">
                <div className="container_login_imagem">
                  {/* <div className='container_login_imagem_img'></div> */}
                  <Card.Img
                    src={logo_login}
                    style={{ maxWidth: "95%", maxHeight: "95%", margin: "2.5%" }}
                  ></Card.Img>
                </div>
              </Link>
              <div className="container_login_form">
                <div className="container_login_form_welcome">
                  <h3>Bem vindo</h3>
                </div>
                <Form className="container_login_form_preenche">
                  <Form.Label className="connect-label">
                    Conecte sua conta
                  </Form.Label>
                  <Form.Group>
                    <Form.Group className="control-field" controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
    
                    <Form.Group className="control-field" controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
    
                    <Form.Group controlId="formBasicButton">
                      <Button type="button" className="botao_login" onClick={handleFormCompleted.bind(this)}>
                        Login
                      </Button>
                    </Form.Group>
    
                    <Link to="/registration" className="criar_conta">
                      Criar sua conta
                    </Link>
    
                    <Link to="/registration" className="esqueceu_senha">
                      Esqueceu sua senha?
                    </Link>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        );
}

export default LoginPage;
