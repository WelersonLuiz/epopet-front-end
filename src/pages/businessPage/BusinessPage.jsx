import React, { useContext, useEffect } from 'react';
import axios from "axios";
import { Header } from "../../components/common";
import BusinessList from './business-list';
import { BusinessContext } from "../../context/business-context";
import { flashErrorMessage } from '../../components/flash-message';

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
        <div className="title"></div>
        <div className="filters"></div>
        <div className="results">
          <h1>Business List:</h1>
          <BusinessList businesses={state.businesses} />
        </div>
        <div className=""></div>
        <div className=""></div>
      </div>
      
      {/* <div>
        <form>
          <label>
            Selecione uma Clínica
            <select
              id="business"
              onChange={this.onChange.bind(this)}
            >
              {this.state.businessList.map((business) => (
                <option key={business.id} value={business.name}>
                  {business.name}
                </option>
              ))}
            </select>
          </label>
          <h1 className='container_name_address'>
            <p >Name - {this.state.selectedBusiness.name}</p>
            <p>Address - {this.state.selectedBusiness.address}</p>
            <p>Tipo - {this.state.selectedBusiness.businessType}</p>
          </h1>
        </form>
      </div> */}
    </div>
  );
}

export default BusinessPage;
