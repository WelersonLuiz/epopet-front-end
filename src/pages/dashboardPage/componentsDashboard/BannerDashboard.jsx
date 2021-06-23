import React, { useContext } from "react";
import {Context} from "../../../components/authContext"

import "./BannerDashboard.css"


import logobig from "../../../images/banner.png";
import nomelogobig from "../../../images/logobigSize.png";
    
export default function BannerDash(){
    const {user} = useContext(Context)
    console.log(user)
    return (
        
        <div className="logo_main">
            
            <img src={logobig} className="img_nome_logo" />
            <p>Olá {user.name}</p>
        </div>
    )

}