import React, { useContext, useEffect } from 'react';
import axios from "axios";
import { Header } from "../../components/common";
import BusinessList from './business-list';
import { BusinessContext } from "../../context/business-context";
import { flashErrorMessage } from '../../components/flash-message';
import './BusinessPage.css';

const BusinessPage = () => {
  const [state, dispatch] = useContext(BusinessContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get('http://localhost:8080/business')
          .catch((error) => {
            if (error.response.data.errorCode === 1) {
              return { data: [] };
            } else {
              throw error;
            }
          });
        console.log("Response ", response)
        dispatch({
          type: 'FETCH_BUSINESSES',
          payload: response.data.data || response.data,
        });
        this.setState({
          businessList: response.data
        });
      } catch (error) {
        flashErrorMessage(dispatch, error);
      }
    };
    fetchData();
  }, [dispatch]);
  
  // state = {
  //   selectedBusiness: {},
  //   businessList: [],
  // };


  // async onChal
  // async getBusinessList(){
  //   await axios
  //     .get("http://localhost:8080/business")
  //     .then((response) => {
  //       this.setState({ businessList: response.data });
  //     })
  //     .catch((error) => {
  //       console.log("register error", error);
  //     });
 
  // };

  // async componentDidMount() {   
  //   await this.getBusinessList();
    
  // }
  return (
    <div>
      <Header />
      <div className="business-list-body">
        <div className="business-list-title">
          <h1>Lista de Estabelecimentos</h1>
        </div>
        <div className="business-list-filters">
          <div className="bussiness-list-search-box">
            {/* <SearchBar input={input} onChange={updateInput} /> */}
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
          <BusinessList businesses={state.businesses} />
        </div>
        <div className=""></div>
        <div className=""></div>
      </div>
    </div>
  );
}

export default BusinessPage;
