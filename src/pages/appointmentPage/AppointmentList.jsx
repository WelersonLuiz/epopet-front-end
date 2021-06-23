import React from 'react';
import { Card } from 'semantic-ui-react';
import AppointmentCard from './AppointmentCard';

const AppointmentList = ({ appointments }) => {
  const cards = () => {
    return appointments.map(appointment => {
      return <AppointmentCard key={appointment.appointmentDate} appointment={appointment} />;
    });
  };

  return <Card.Group>{cards()}</Card.Group>;
}

export default AppointmentList;
