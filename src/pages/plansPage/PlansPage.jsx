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
                
                <CardDeck style={{paddingTop:"0.5%"}}>
                <Card className="PlanosPageEsquerda" style={{alignItems:"center"}}>
                <Card.Header className = "PlanosTitleTxt"style={{width:"100%"}}>Pigmeu</Card.Header>
                <Card.Img variant="top" src={img_pigmeu} style={{maxHeight:"50%",maxWidth:"50%",margin:"2.5%"}}/>
                <Card.Body>
                    <Card.Text className ="descriptionPlanoTexto" style={{textAlign:"justify",margin:"0.5%",}}>
                    Com o Plano Pigmeu seu pet terá acesso a:
                    Consultas e plantão,
                    Consultas virtuais, 
                    Consultas de Urgência e Emergência,
                    Vacinas,
                    Exames laboratoriais,
                    Exames de imagem básicos, 
                    Procedimentos clínicos,
                    Tudo isso por apenas R$ 70,00 mensais!
                    </Card.Text>
                    <Button variant="primary">Saiba mais...</Button>
                </Card.Body>
                </Card>
                <Card className="PlanosPageCentro" style={{alignItems:"center"}}>
                <Card.Header className = "PlanosTitleTxt" style={{width:"100%"}}>Comum</Card.Header>
                <Card.Img variant="top" src={img_pigmeu} style={{maxHeight:"50%",maxWidth:"50%",margin:"2.5%"}}/>
                <Card.Body>
                    
                <Card.Text style={{textAlign:"justify",margin:"2.5%"}}>
                Com o Plano Comum seu pet terá acesso a:
                Todos os benefícios do plano anterior, 
                Cirurgias, 
                Anestesia local e injetável, 
                Exames cardiovasculares,
                Benefícios acrescidos por apenas R$ 140,00 mensais! 
                    </Card.Text>
                    <Button variant="primary">Saiba mais...</Button>
                </Card.Body>
                </Card>
                <Card className="PlanosPageDireita" style={{alignItems:"center"}}>
                    <Card.Header className = "PlanosTitleTxt" style={{width:"100%"}}>Nilo</Card.Header>
                    <Card.Img variant="top" src={img_pigmeu} style={{maxHeight:"50%",maxWidth:"50%",margin:"2.5%"}}/>
                    <Card.Body>
                    <Card.Text style={{textAlign:"justify",margin:"2.5%"}}>
                    Com o Plano Nilo seu pet terá acesso a:
                    Todos os benfícos dos planos anteriores, 
                    Visitas a petshops, 
                    Especialistas, 
                    Internação,
                    Todas as vantagens por apenas R$ 180,00 mesais!
                        </Card.Text>
                        <Button  variant="primary" >Saiba mais...</Button>
                    </Card.Body>
                </Card>
                </CardDeck>
                    
                </div>


            </div> 

        );
    }

}

export default PlansPage;