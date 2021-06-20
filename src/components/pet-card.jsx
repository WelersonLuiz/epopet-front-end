import React from 'react';
import  axios  from  'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Icon } from 'semantic-ui-react';
import  { PetContext }  from  '../context/pet-context';
import  { flashErrorMessage }  from  './flash-message';

const  { useContext }  =  React;

const PetCard = ({ pet }) => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(PetContext);

  const deletePet = async id => {
    try {
      console.log("Deleting id: ", id)
      const response = await axios.delete(
        `http://localhost:8080/pet/${id}`,
      );
      dispatch({
        type: 'DELETE_PET',
        payload: id,
      });
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name="user outline" /> {pet.name}
        </Card.Header>
        <Card.Description>
          <p>
            Espécie - {pet.species}
          </p>
          <p>
            Dt.Nasc - {pet.dateOfBirth}
          </p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic
            color="green"
            as={Link}
            to={`/pets/edit/${pet.id}`}
          >
            Edit
          </Button>
          <Button basic color="red" onClick={() => deletePet(pet.id)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

export default PetCard;
