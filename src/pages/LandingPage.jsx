import React, { Component } from "react";

import "./LandingPage.css"

import {Header} from './common'

import logobig from '../images/banner.png'
import nomelogobig from '../images/logobigSize.png'
import petbanner from '../images/petbanner.jpg'

import { CardGroup, Card, Button} from 'react-bootstrap'

class LandingPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Header/>
                <div className='logo_main'>
                    <img src={logobig} className="img_logo"/>
                    <img src={nomelogobig} className="img_nome_logo"/>
                </div>
                <CardGroup style={{maxHeight:"25%",maxWidth:"55%",position:"relative",marginTop:"29%",marginLeft:"25%"}}>
                    <Card style={{alignItems:"center",border:"none"}}>
                        <Card.Text style={{textAlign:"right"}}>There variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</Card.Text>
                        <Button href='/nos' style={{maxHeight:"20%",maxWidth:"50%"}}>Saiba mais</Button>
                    </Card>
                    <Card style={{alignItems:"center",border:"none"}}>
                        <Card.Img variant="bottom" src={petbanner} style={{height:"75%",width:"75%"}}></Card.Img>
                    </Card>
                </CardGroup>
                
            </div>

        );
    }

}

export default LandingPage;