import React from 'react';
import { Card } from 'semantic-ui-react';
import BusinessCard from './business-card';

const BusinessList = ({ businesses }) => {
  const cards = () => {
    console.log("BUSINESSES ", businesses)
    return businesses.map(business => {
      return <BusinessCard key={business.id} business={business} />;
    });
  };

  return <Card.Group>{cards()}</Card.Group>;
}

export default BusinessList;
