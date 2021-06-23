import React, { useContext, useEffect } from "react";
import { Context } from "../../components/authContext";
import { NavLink } from "react-router-dom";
import axios from "axios";
import PetList from "./pet-list";
import { PetContext } from "../../context/pet-context";
import {
  FlashMessage,
  flashErrorMessage,
} from "../../components/flash-message";
import { Header } from "../../components/common";
import "./pet-list-page.css";

const PetListPage = () => {
  const [state, dispatch] = useContext(PetContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        var user = localStorage.getItem("user");
        const response = await axios
          .get("http://localhost:8080/pet/client/" + JSON.parse(user).id)
          //.get("http://localhost:8080/pet")
          .catch((error) => {
            if (error.response.data.errorCode === 1) {
              return { data: [] };
            } else {
              throw error;
            }
          });
        console.log("Response: ", response);
        dispatch({
          type: "FETCH_PETS",
          payload: response.data.data || response.data, // in case pagination is disabled
        });
      } catch (error) {
        flashErrorMessage(dispatch, error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <Header />

      <div className="pet-list-body">
        <div className="pet-list-options">
          <div className="ui two item menu">
            <NavLink
              className="item pet-list-navlink"
              activeClassName="active"
              exact
              to="/pets/new"
            >
              Adiciona Pet
            </NavLink>
          </div>
        </div>
        <div className="pet-list-title">
          <h1>Seus Pets</h1>
        </div>
        {state.message.content && <FlashMessage message={state.message} />}
        <div className="pet-list-results">
          <PetList pets={state.pets} />
        </div>
      </div>
    </div>
  );
};

export default PetListPage;
