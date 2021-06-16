import React, { Component} from "react";
import axios from "axios";

class Pets extends Component{

    state = {
        pets : ''
    }

    componentPet() {
    axios.get(
        "http://localhost:8080/pet"
      )
      .then(response => {
        console.log("register response", response);

        console.log(response.data);
        
      })
      .catch(error => {
        console.log("register error", error);
      });
    }
    render() {
        this.componentPet();
        return (<div><h3>{this.state.pets}</h3></div>)
    }
}

export default Pets;
