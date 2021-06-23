import React, { Component } from "react";
import axios from "axios";
import { Header } from "../components/common";


class BusinessList extends Component {
  state = {
    selectedBusiness: {},
    businessList: [],
  };


  async onChange(e) {
    console.log('Seleciona:',e.target.value)
    await this.state.businessList.filter(async (business) => {
      if (business.name == e.target.value) {
         await this.setState({ selectedBusiness: business });
      }
    });
    console.log('Selecionado',this.state.selectedBusiness)
  };

  async getBusinessList(){
    await axios
      .get("http://localhost:8080/business")
      .then((response) => {
        console.log('Responta Back:', response.data)
        this.setState({ businessList: response.data });
      })
      .catch((error) => {
        console.log("register error", error);
      });
 
  };

  async componentDidMount() {   
    await this.getBusinessList();
    
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
                onChange={this.onChange.bind(this)}
              >
                {this.state.businessList.map((business) => (
                  <option key={business.id} value={business.name}>
                    {business.name}
                  </option>
                ))}
              </select>
            </label>
            <h1 className='container_name_address'>
              <p >Name - {this.state.selectedBusiness.name}</p>
              <p>Address - {this.state.selectedBusiness.address}</p>
              <p>Tipo - {this.state.selectedBusiness.businessType}</p>
            </h1>
          </form>
        </div>
      </div>
    );
  }
}

export default BusinessList;
