import React, { Component } from "react";

import "./PlansPage.css"
import {Header} from '../../components/common'
import { CardDeck, Card, Button} from 'react-bootstrap'
import img_pigmeu from '../../images/login_image.png'


class PlansPage extends Component{
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
                
                <CardDeck style={{paddingTop:"2.0%"}}>
                <Card className="text-center" style={{alignItems:"center"}}>
                <Card.Header style={{width:"100%"}}>Pigmeu</Card.Header>
                <Card.Img variant="top" src={img_pigmeu} style={{maxHeight:"50%",maxWidth:"50%",margin:"2.5%"}}/>
                <Card.Body>
                    <Card.Text style={{textAlign:"justify",margin:"2.5%"}}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </Card.Text>
                    <Button variant="primary">Saiba mais...</Button>
                </Card.Body>
                </Card>
                <Card className="text-center" style={{alignItems:"center"}}>
                <Card.Header style={{width:"100%"}}>Normal</Card.Header>
                <Card.Img variant="top" src={img_pigmeu} style={{maxHeight:"50%",maxWidth:"50%",margin:"2.5%"}}/>
                <Card.Body>
                    
                <Card.Text style={{textAlign:"justify",margin:"2.5%"}}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </Card.Text>
                    <Button variant="primary">Saiba mais...</Button>
                </Card.Body>
                </Card>
                <Card className="text-center" style={{alignItems:"center"}}>
                    <Card.Header style={{width:"100%"}}>Nilo</Card.Header>
                    <Card.Img variant="top" src={img_pigmeu} style={{maxHeight:"50%",maxWidth:"50%",margin:"2.5%"}}/>
                    <Card.Body>
                    <Card.Text style={{textAlign:"justify",margin:"2.5%"}}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </Card.Text>
                        <Button variant="primary">Saiba mais...</Button>
                    </Card.Body>
                </Card>
                </CardDeck>
                    
                </div>


            </div> 

        );
    }

}

export default PlansPage;