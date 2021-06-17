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
        <div className="container">
          <Carousel style={{ margin: "10%" }}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={img_pigmeu}
                alt="First slide"
                style={{ maxHeight: "30%", maxWidth: "30%" }}
              />
              <Carousel.Caption>
                <h3>Quem Somos?</h3>
                <p style={{ textAlign: "justify" }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={img_pigmeu}
                alt="Second slide"
                style={{ maxHeight: "30%", maxWidth: "30%" }}
              />
              <Carousel.Caption>
                <h3>O que fazemos?</h3>
                <p style={{ textAlign: "justify" }}>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English. .
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={img_pigmeu}
                alt="Third slide"
                style={{ maxHeight: "30%", maxWidth: "30%" }}
              />
              <Carousel.Caption>
                <h3>Nossos parceiros</h3>
                <p style={{ textAlign: "justify" }}>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source.{" "}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
}

export default AboutPage;
