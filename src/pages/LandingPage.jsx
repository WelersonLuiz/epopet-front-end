import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import "./LandingPage.css"

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Header} from './common'

class LandingPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
            <div>
                <Header/>
            </div> 
            <div className='container'>

            </div>
            </div>

        );
    }

}

export default LandingPage;