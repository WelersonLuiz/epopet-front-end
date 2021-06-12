import React, { Component } from "react";

class BusinessList extends Component {
  state = {
    business:[
      {id:"1", name: "Clinica Laranja", address:{ street:"Rua da Laranja, nº1", district:" Tiradentes", city: "São Paulo", State:"SP"} },
      {id:"2", name: "Clinica Limão", address:{ street:"Rua do Limão, nº2", district:" Morumbi", city: "São Paulo", State:"SP"} },
      {id:"3", name: "Clinica Coco", address:{ street:"Rua do Coco, nº3", district:" Leblon", city: "Rio de Janeiro", State:"RJ"} },
      {id:"4", name: "Clinica Manga", address:{ street:"Rua da Manga, nº4", district:" Ipanema", city: "Rio de Janeiro", State:"RJ"} }
    ]
  };

  handleLogout = () => {
    this.props.handleLogout()
    this.props.history.push("/");
  }
    
  render() {
    return (
      <div>
        <h1>Selecione uma Clínica </h1>
        <select>
          {this.state.business.map(business =>(
            <option key={business.id} value={business.name}>
              {business.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default BusinessList;
