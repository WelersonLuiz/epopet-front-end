import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button, Icon } from "semantic-ui-react";
import { PetContext } from "../../context/pet-context";
import { flashErrorMessage } from "../../components/flash-message";
import "./pet-card.css";

const { useContext } = React;

const PetCard = ({ pet }) => {
  const [state, dispatch] = useContext(PetContext);

  const deletePet = async (id) => {
    try {
      console.log("Deleting id: ", id);
      const response = await axios.delete(`http://localhost:8080/pet/${id}`);
      dispatch({
        type: "DELETE_PET",
        payload: id,
      });
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const newAppointmentPage = async (id) => {};

  return (
    <div className="pet-card">
      <Card style={{ width: '100%', maxWidth:'600px', margin:'0 auto', marginBottom:'20px', opacity:'0.9' }}>
        <Card.Content>
          <Card.Header className="pet-card-header">
            <Icon name="paw" /> {pet.name}
          </Card.Header>
          <Card.Description className="pet-card-desc">
            <p>Espécie: {pet.species}</p>
            <p>Dt.Nasc: {pet.dateOfBirth}</p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui three buttons">
            <Button
              basic
              color="green"
              as={Link}
              to={`/pets/edit/${pet.id}`}
              className="pet-card-button"
            >
              <Icon name="edit" />
            </Button>
            <Button
              basic
              color="red"
              className="pet-card-button"
              onClick={() => deletePet(pet.id)}
            >
              <Icon name="delete" />
            </Button>
            <Button
              basic
              color="blue"
              className="pet-card-button"
              onClick={() => newAppointmentPage(pet.id)}
            >
              <Icon name="calendar" />
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default PetCard;
