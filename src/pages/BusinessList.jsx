import React, { Component } from "react";
import axios from "axios";
import { Header } from "../components/common";
import { Card } from "react-bootstrap";
import img_pigmeu from "../images/login_image.png";

class BusinessList extends Component {
  state = {
    selectedBusiness: [],
    businessList: [],
  };

  handleLogout = () => {
    this.props.handleLogout();
    this.props.history.push("/");
  };

  onChange = (e) => {
    this.state.businessList.filter((business) => {
      if (business.id == e.target.value) {
        this.setState({ selectedBusiness: business });
      }
    });
  };

  getBusinessList = () => {
    axios
      .get("http://localhost:8080/business")
      .then((response) => {
        this.setState({ businessList: response.data });
      })
      .catch((error) => {
        console.log("register error", error);
      });
  };

  componentDidMount() {
    this.getBusinessList();
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <form>
            <label>
              Selecione uma Clínica
              <select
                id="business"
                value={this.state.business.name}
                onChange={this.onChange}
              >
                {this.state.business.map((business) => (
                  <option key={business.id} value={business.name}>
                    {business.name}
                  </option>
                ))}
              </select>
            </label>
            <p >Name - {this.state.selectedBusiness.name}</p>
             <p>Address - {this.state.selectedBusiness.address}</p>
          {/*   <Card htmlfor="business" style={{ alignItems: "center" }}>
              <Card.Title>Title</Card.Title>
              <Card.Img
                src={img_pigmeu}
                style={{ maxHeight: "15%", maxWidth: "15%", margin: "1.5 %" }}
              />
              <Card.Subtitle>Subtitle</Card.Subtitle>
            </Card> */}
          </form>
        </div>
      </div>
    );
  }
}

export default BusinessList;
