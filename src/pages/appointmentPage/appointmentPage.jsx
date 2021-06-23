import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Header, SearchBar } from "../../components/common";
import AppointmentList from "./AppointmentList";
import { AppointmentContext } from "../../context/appointment-context";
import { flashErrorMessage } from "../../components/flash-message";

import "./AppointmentPage.css";

const AppointmentPage = () => {
  const [state, dispatch] = useContext(AppointmentContext);
  const [appointments = [], setAppointments] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        var user = localStorage.getItem("user");
        const response = await axios
          .get("http://localhost:8080/appointment/client/" + JSON.parse(user).id)
          .catch((error) => {
            if (error.response.data.errorCode === 1) {
              return { data: [] };
            } else {
              throw error;
            }
          });
        console.log("Response ", response);
        dispatch({
          type: "FETCH_APPOINTMENTS",
          payload: response.data.data || response.data,
        });
        setAppointments(response.data);
      } catch (error) {
        flashErrorMessage(dispatch, error);
      }
    };
    fetchData();
  }, [dispatch]);

  const updateInput = async (e) => {
    var input = e.target.value;
    const filtered = state.appointments.filter((appointment) => {
      return appointment.appointmentDate.toLowerCase().includes(input.toLowerCase());
    });
    setAppointments(filtered);
  };
  
  const BarStyling = {width:"100%",background:"#F2F1F9", border:"none", padding:"0.5rem"};

  return (
    <div>
      <Header />
      <div className="appointment-list-body">
        <div className="appointment-list-options" style={{display:'none'}}>
          <div className="ui two item menu">
            <NavLink
              className="item appointment-list-navlink"
              activeClassName="active"
              exact
              to="/appointment/new"
            >
              Adiciona Pet
            </NavLink>
          </div>
        </div>
        <div className="appointment-list-title">
          <h1>Lista de Agendamentos</h1>
        </div>
        <div className="appointment-list-filters">
          <div className="appointment-list-search-box">
            <input
              style={BarStyling}
              key="random1"
              placeholder={"Procurar Agendamento"}
              onChange={updateInput}
            />
          </div>
        </div>
        <div className="appointment-list-results">
          <AppointmentList appointments={appointments} />
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
