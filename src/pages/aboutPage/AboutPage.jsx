import React, { Component } from "react";

import "./AboutPage.css";
import Header from "../../components/common/header/Header";
import { Carousel } from "react-bootstrap";
import img_pigmeu from "../../images/login_image.png";

class AboutPage extends Component {
  constructor(props) {
    super(props);
  }

  goToLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <Header />
        <div className="AboutContainer">
          <Carousel  style={{ margin: "10%", WebkitTextFillColor:"darkgreen", WebkitTextStrokeColor:"darkgreen"}}>
            <Carousel.Item  >
              <img
                variant="top"
                className="AboutPageEsquerdaImg"
                src={img_pigmeu}
                alt="First slide"
                style={{ maxHeight: "10%", maxWidth: "10%" }}
              />
              <h3 style={{fontSize:"150%" }}> Quem Somos?</h3>
                <p className= "AboutPageDireitaTxt" style={{ textAlign: "justify",padding:"5%", fontSize:"large" }}>
                    O plano de saúde para pets Epopet nasceu com a missão de aprimorar o encaminhamento do cliente à consultas 
                  e diagnósticos para seu pet, focando na empatia e em, principalmente,
                   sua confiança para com nossos serviços através do investimento 
                   do bom atendimento, conforto e agilidade. Ter um plano de saúde é uma forma de retribuir todo o amor
                    e carinho que o seu pet tem, além de trazer mais tranquilidade e segurança 
                    para que vocês aproveitem cada momento juntos.
                </p>
              <Carousel.Caption  >
               
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="AboutPageEsquerdaImg"
                src={img_pigmeu}
                alt="Second slide"
                style={{ maxHeight: "10%", maxWidth: "10%" }}
              />
              <h3 style={{fontSize:"150%" }}>O que fazemos?</h3>
                <p className= "AboutPageDireitaTxt" style={{ textAlign: "justify",padding:"5%", fontSize:"large"  }}>
                  Um só plano para todos os seus pets! Contrate agora um dos 
                  nossos planos e cadastre todos os seus pets na nossa plataforma online
                  para agendar consultas e cirurgias na nossa rede credenciada de parceiros! 
                  Nosso serviço conta com três planos disponíveis, sendo eles o plano Pigmeu (versão Standard),
                   plano Comum (versão Plus) e plano Nilo (versão Premium).
                    Confira mais na aba Planos!
                </p>
              <Carousel.Caption>
                
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
               className="AboutPageEsquerdaImg"
                src={img_pigmeu}
                alt="Third slide"
                style={{ maxHeight: "10%", maxWidth: "10%" }}
              />
               <h3 style={{fontSize:"150%" }}>Nossos parceiros</h3>
                <p className= "AboutPageDireitaTxt" style={{textAlign: "justify", padding:"5%", fontSize:"large"}}>
                Com o Epopet você tem à disposição uma rede de prestadores prontos para atender seu pet.
                Tenha acesso imediato aos melhores profissionais especializados em cuidados veterinário 
                disponíveis em clínicas e hospitais para um rápido diagnóstico.
                </p>
              <Carousel.Caption>
               
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
}

export default AboutPage;
