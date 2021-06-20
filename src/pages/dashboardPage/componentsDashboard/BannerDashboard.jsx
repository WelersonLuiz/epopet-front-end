import React from "react";

import "./BannerDashboard"


import logobig from "../../../images/banner.png";
import nomelogobig from "../../../images/logobigSize.png";
    
export default function BannerDash(){

    return (
        <div className="logo_main">
            <img src={logobig} className="img_logo" />
            <img src={nomelogobig} className="img_nome_logo" />
        </div>
    )

}