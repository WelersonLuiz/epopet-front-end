import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import PetList from '../../components/pet-list';
import { PetContext } from '../../context/pet-context';
import { FlashMessage, flashErrorMessage } from '../../components/flash-message';

const PetListPage = () => {
  const [state, dispatch] = useContext(PetContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Getting pets")
        const response = await axios.get('http://localhost:8080/pet');
        console.log("Response: ", response)
        dispatch({
          type: 'FETCH_PETS',
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
      <div className="ui two item menu">
        <NavLink className="item" activeClassName="active" exact to="/pets">
          Pets List
        </NavLink>
        <NavLink
          className="item"
          activeClassName="active"
          exact
          to="/pets/new"
        >
          Add Pet
        </NavLink>
      </div>
      <h1>List of Pets</h1>
      {state.message.content && <FlashMessage message={state.message} />}
      <PetList pets={state.pets} />
    </div>
  );
}

export default PetListPage;
