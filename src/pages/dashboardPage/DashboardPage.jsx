import React, { Component,useContext } from "react";
import {Context} from "../../components/authContext"
import { Redirect } from "react-router-dom";

import { Header } from "../../components/common";
import BannerDash from "./componentsDashboard/BannerDashboard"

function DashboardPage(props){
  const {handleLogout} = useContext(Context)
  console.log('TEste')
  return (
      <div>
        <Header/>
        <BannerDash/>
        <button onClick={() => handleLogout()}>Logout</button>
        <button onClick={() => props.history.push('/pets')}>Pets</button>
      </div>
  )
}

export default DashboardPage;
