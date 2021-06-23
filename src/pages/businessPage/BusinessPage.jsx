import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Header, SearchBar } from "../../components/common";
import BusinessList from "./business-list";
import { BusinessContext } from "../../context/business-context";
import { flashErrorMessage } from "../../components/flash-message";

import "./BusinessPage.css";

const BusinessPage = () => {
  const [state, dispatch] = useContext(BusinessContext);
  const [businesses = [], setBusinesses] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get("http://localhost:8080/business")
          .catch((error) => {
            if (error.response.data.errorCode === 1) {
              return { data: [] };
            } else {
              throw error;
            }
          });
        console.log("Response ", response);
        dispatch({
          type: "FETCH_BUSINESSES",
          payload: response.data.data || response.data,
        });
        setBusinesses(response.data);
      } catch (error) {
        flashErrorMessage(dispatch, error);
      }
    };
    fetchData();
  }, [dispatch]);

  const updateInput = async (e) => {
    var input = e.target.value;
    const filtered = state.businesses.filter((business) => {
      return business.name.toLowerCase().includes(input.toLowerCase());
    });
    setBusinesses(filtered);
  };
  
  const BarStyling = {width:"100%",background:"#F2F1F9", border:"none", padding:"0.5rem"};

  return (
    <div>
      <Header />
      <div className="business-list-body">
        <div className="business-list-title">
          <h1>Lista de Estabelecimentos</h1>
        </div>
        <div className="business-list-filters">
          <div className="bussiness-list-search-box">
            <input
              style={BarStyling}
              key="random1"
              placeholder={"Procurar Estabelecimento"}
              onChange={updateInput}
            />
          </div>

          <select name="states" id="states">
            <option value="AC">AC</option>
            <option value="AL">AL</option>
            <option value="AP">AP</option>
            <option value="AM">AM</option>
            <option value="BA">BA</option>
            <option value="CE">CE</option>
            <option value="DF">DF</option>
            <option value="ES">ES</option>
            <option value="GO">GO</option>
            <option value="MA">MA</option>
            <option value="MT">MT</option>
            <option value="MS">MS</option>
            <option value="MG">MG</option>
            <option value="PA">PA</option>
            <option value="PB">PB</option>
            <option value="PR">PR</option>
            <option value="PE">PE</option>
            <option value="PI">PI</option>
            <option value="RJ">RJ</option>
            <option value="RN">RN</option>
            <option value="RS">RS</option>
            <option value="RO">RO</option>
            <option value="RR">RR</option>
            <option value="SC">SC</option>
            <option value="SP">SP</option>
            <option value="SE">SE</option>
            <option value="TO">TO</option>
          </select>
          <select name="cities" id="cities">
            <option value="city">City</option>
          </select>
          <select name="districts" id="districts">
            <option value="district">District</option>
          </select>
        </div>
        <div className="business-list-results">
          <BusinessList businesses={businesses} />
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;
