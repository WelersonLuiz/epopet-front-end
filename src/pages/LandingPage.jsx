import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import "./LandingPage.css"

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class LandingPage extends Component{
    constructor(props){
        super(props);
    }

    GoToLogin = (e) => {
        this.props.history.push("/login")
    }

    render(){
        return(
            <div>
                <div className='no_login_cabecalho'>

                    <Button className='no_login_cabecalho_botao_login' onClick={this.GoToLogin}>Login</Button>

                </div>
                <div className='no_login_rodape'>
                    <h1>RODAPE</h1>

                </div>
                <div className='no_login_esquerda'>
                    <p>Lorem Ipsum is simply dummy 
                       text of the printing and typesetting industry. 
                       Lorem Ipsum has been the industry's standard dummy 
                       text ever since the 1500s, when an unknown printer 
                       took a galley of type and scrambled it to make a type
                       specimen book. It has survived not only five centuries, 
                       but also the leap into electronic typesetting, remaining 
                       essentially unchanged. It was popularised in the 1960s with the 
                       release of Letraset sheets containing Lorem Ipsum passages, 
                       and more recently with desktop publishing software like Aldus 
                       PageMaker including versions of Lorem Ipsum.</p>
                </div>
                <div className='no_login_direita'>
                    <h1>DIREITA</h1>

                </div>

            </div> 

        );
    }

}

export default LandingPage;