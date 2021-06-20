import React from 'react';
import { Card } from 'semantic-ui-react';
import PetCard from './pet-card';

const PetList = ({ pets }) => {
  const cards = () => {
    return pets.map(pet => {
      return <PetCard key={pet._id} pet={pet} />;
    });
  };

  return <Card.Group>{cards()}</Card.Group>;
}

export default PetList;
