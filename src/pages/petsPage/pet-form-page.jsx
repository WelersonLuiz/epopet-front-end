import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PetForm from '../../components/pet-form';
import { flashErrorMessage } from '../../components/flash-message';
import { PetContext } from '../../context/pet-context';
import { Header } from "../../components/common";
const PetFormPage = ({ match }) => {
  const [state, dispatch] = useContext(PetContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { _id } = match.params; // Grab URL _id

    if (_id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/pet/${_id}`,
          );
          dispatch({
            type: 'FETCH_PET',
            payload: response.data,
          });
          setLoading(false);
        } catch (error) {
          flashErrorMessage(dispatch, error);
        }
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [match.params, dispatch]);

  if (loading) {
    return <p>Please wait...</p>;
  }

  return (
    <div>
      <PetForm pet={state.pet} />
    </div>
  );
}

export default PetFormPage;
