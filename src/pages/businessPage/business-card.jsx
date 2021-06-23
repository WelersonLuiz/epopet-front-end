import React from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import { BusinessContext } from "../../context/business-context";
import "./business-card.css";

const { useContext } = React;

const BusinessCard = ({ business }) => {
  const [state, dispatch] = useContext(BusinessContext);

  const newAppointmentPage = async (id) => {};

  return (
    <div className="business-card">
      <Card style={{width:'100%', margin: '0 auto'}}>
        <Card.Content>
          <Card.Header className="business-card-header">
            <Icon name="home" /> {business.name}
          </Card.Header>
          <Card.Description className="business-card-desc">
            <p>Nome: {business.name}</p>
            <p>Endereço: {business.address}</p>
            <p>CNPJ: {business.cnpj}</p>
            <p>Tipo: {business.businessType}</p>
            <p>Serviços: {business.servicesAvailable}</p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              basic
              color="blue"
              className="businessCardButton"
              onClick={() => newAppointmentPage(business.id)}
            >
              Agendar Consulta
            </Button>
          </div>
        </Card.Content> 
      </Card>
    </div>
  );
};

export default BusinessCard;
