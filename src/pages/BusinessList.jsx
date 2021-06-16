import React, { Component } from "react";
import axios from "axios";
import {Header} from './common'
import "./BusinessList.css"

class BusinessList extends Component {
  state = {
    selectedBusiness: [],
    businessList: []
  };
  

  handleLogout = () => {
    this.props.handleLogout()
    this.props.history.push("/");
  }

  onChange = e => {
    this.state.businessList.filter(business => {
      if (business.id == e.target.value){
        this.setState({selectedBusiness:business})        
      }
    })

  }
  
  getBusinessList = () => {
    axios.get(
      "http://localhost:8080/business"
    )
    .then(response => {
      this.setState({businessList:response.data})
    })
    .catch(error => {
      console.log("register error", error);
    });
  }
  
  componentDidMount() {
    this.getBusinessList();
  }

  
  render() {

    return (
      <form>
        <Header/>
        <label className=/* 'container_login_form_welcome' */'container_business_form'>Selecione uma Clínica
        </label>
         <select
          id="business"
          onChange={this.onChange}
         >
          <option value="" disabled selected>Select Clinic</option>
          {this.state.businessList.map(business =>(
            <option key={business.id} value={business.id}>
              {business.name}
            </option>
          ))}
         </select>
       
        
        <p>Name - {this.state.selectedBusiness.name}</p>
        <p>Address - {this.state.selectedBusiness.address}</p>
      </form>
    );
  }
}

export default BusinessList;
