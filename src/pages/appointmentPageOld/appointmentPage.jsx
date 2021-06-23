import React, { Component,useContext,useEffect,useState } from "react";
import axios from "axios";

import {Context} from "../../components/authContext"
import { Header } from "../../components/common";


function AppointmentPage(props){
    const [state,setState] = useState({})
    const user = JSON.parse(localStorage.getItem('user'))

    const getBusinessList = async () => {
        await axios
          .get("http://localhost:8080/business")
          .then((response) => {
            console.log('Responta Back:', response.data)
            setState({ businessList: response.data });
          })
          .catch((error) => {
            console.log("register error", error);
          });
     
      };


    useEffect(() => {
        getBusinessList();
        return () => {};
    },[])


    console.log('TEste')
    console.log(user)
    return (
        <div>
          <Header/>
          <h2>Hello</h2>
          <h3>{user.name}</h3>
          <h3>{user.id}</h3>
          {console.debug('State agora: ',state)}
        </div>
    )
  }
  
  export default AppointmentPage;
  
