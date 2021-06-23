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
        
      </div>
  )
}

export default DashboardPage;
