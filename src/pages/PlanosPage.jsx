import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import "./PlanosPage.css"
import {Header} from './common'

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class AboutPage extends Component{
    constructor(props){
        super(props);
    }

    GoToLogin = (e) => {
        this.props.history.push("/login")
    }

    render(){
        return(
            <div>
                <div>
                    <Header/>
                </div>
                <div className='container'>
                    <div className='PlanosPageEsquerda'> 
                            Pigmeu                
                    </div>
                    <div className='PlanosPageCentro'> 
                            Comum                    
                    </div>
                    <div className='PlanosPageDireita'> 
                            Nilo
                    </div>
                </div>


            </div> 

        );
    }

}

export default AboutPage;