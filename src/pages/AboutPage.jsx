import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import "./AboutPage.css"
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
                    <div className='AboutPageEsquerda'>
                        <div className='AboutPageEsquerdaImg'></div>
                        
                    </div>
                    <div className='AboutPageDireita'> 
                    <p className='AboutPageDireitaTxt'>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                    </p>

                    </div>
                </div>


            </div> 

        );
    }

}

export default AboutPage;