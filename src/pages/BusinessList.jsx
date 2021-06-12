import React, { Component} from "react";

class BusinessList extends Component {
  state = {
    value:"Clinica laranja",
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

  onChange = e =>{
    this.setState({value:e.target.value})
  }
    
  render() {
    const {value,business} =this.state;
    return (
      <form>
        <label>Selecione uma Clínica
         <select
         id="business"
          value={this.state.business.name}
          onChange={this.onChange}
         >
          {this.state.business.map(business =>(
          <option key={business.id} value={business.name}>
              {business.name}
            </option>
          ))}
         </select>
        </label>  
        <p htmlfor="business">{value}</p>
      </form>
    );
  }
}

export default BusinessList;
