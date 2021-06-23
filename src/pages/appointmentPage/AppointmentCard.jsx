import React from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import { AppointmentContext } from "../../context/appointment-context";
import "./AppointmentCard.css";

const { useContext } = React;

const AppointmentCard = ({ appointment }) => {
  const [state, dispatch] = useContext(AppointmentContext);

  const newAppointmentPage = async (id) => {};

  return (
    <div className="appointment-card">
      <Card style={{width:'100%', margin: '0 auto'}}>
        <Card.Content>
          <Card.Header className="appointment-card-header">
            <Icon name="calendar" /> {appointment.appointmentDate}
          </Card.Header>
          <Card.Description className="appointment-card-desc">
            <p>Serviço: {appointment.serviceType}</p>
            <p>Clinica: {appointment.business.name}</p>
            <p>Endereço: {appointment.business.address}</p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        </Card.Content> 
      </Card>
    </div>
  );
};

export default AppointmentCard;
