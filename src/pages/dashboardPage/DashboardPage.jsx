import React, { useContext } from "react";
import { Context } from "../../components/authContext";
import LandingPage from "../landingPage/LandingPage";
import "./DashboardPage.css";

function DashboardPage(props) {
  const { handleLogout } = useContext(Context);
  return (
    <div>
      <LandingPage />
    </div>
  );
}

export default DashboardPage;
