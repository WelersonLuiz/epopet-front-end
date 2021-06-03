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

    render(){
        return(
            <div>
                <div className='no_login_cabecalho'>
                    <h1>CABECALHO</h1>

                </div>
                <div className='no_login_rodape'>
                    <h1>RODAPE</h1>

                </div>
                <div className='no_login_esquerda'>
                    <h1>ESQUERDA</h1>
                </div>
                <div className='no_login_direita'>
                    <h1>DIREITA</h1>

                </div>

            </div> 

        );
    }

}

export default LandingPage;