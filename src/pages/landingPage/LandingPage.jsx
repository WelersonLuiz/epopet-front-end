import React, { Component } from "react";

import "./LandingPage.css";

import { Header } from "../../components/common";
import { Button } from 'semantic-ui-react';

import logo from "../../images/banner.png";
import logoName from "../../images/logobigSize.png";
import descImage from "../../images/petbanner.jpg";

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />

        <div className="body">
          <div className="banner">
            <img src={logo} className="img_logo" />
            <img src={logoName} className="img_nome_logo" />
          </div>
          <div className="about">
            <div className="description">
              Somos um plano de saúde digital para animais de estimação.
              Oferecemos todo o carinho e proteção que o seu melhor amigo merece
              sem burocracia e sem surpresas na conta no final do mês.
              <Button href="/nos" style={{ maxHeight: "20%", maxWidth: "50%" }}>
                Saiba mais
              </Button>
            </div>
            <div className="desc-image">
              <img src={descImage} style={{ height: "75%", width: "75%" }} />
            </div>
          </div>
        </div>

        {/* <div className="logo_main">
          <img src={logobig} className="img_logo" />
          <img src={nomelogobig} className="img_nome_logo" />
        </div> */}

        {/* <CardGroup
          style={{
            maxHeight: "25%",
            maxWidth: "55%",
            position: "relative",
            marginTop: "29%",
            marginLeft: "25%",
          }}
        >
          <Card style={{ alignItems: "center", border: "none" }}>
            <Card.Text style={{ textAlign: "right" }}>
            Somos um plano de saúde Pet digital para animais de estimação. 
            Oferecemos todo o carinho e proteção que o seu melhor amigo merece sem burocracia
             e sem surpresas na conta no final do mês. 
            </Card.Text>
            <Button href="/nos" style={{ maxHeight: "20%", maxWidth: "50%" }}>
              Saiba mais
            </Button>
          </Card>
          <Card style={{ alignItems: "center", border: "none" }}>
            <Card.Img
              variant="bottom"
              src={petbanner}
              style={{ height: "75%", width: "75%" }}
            ></Card.Img>
          </Card>
        </CardGroup> */}
      </div>
    );
  }
}

export default LandingPage;
