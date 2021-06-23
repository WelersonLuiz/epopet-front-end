import React, { useContext, useState } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { AppointmentContext } from '../context/appointment-context';
import { flashErrorMessage } from './flash-message';
import {Context} from './authContext'


const AppointForm = ({appoint}) => {
  const [state, dispatch] = useContext(AppointmentContext);
  const {user} = useContext(Context)
  const [redirect, setRedirect] = useState(false);
  const { register, errors, handleSubmit } = useForm({
    defaultValues: appoint,
  });

  const createAppointment = async data => {

    
    data['id_pet'] = localStorage.getItem('pet')
    console.log('Criando novo agendamento',data)
    try {
      const response = await axios.post('http://localhost:8080/appointment', data);
      console.log('Responose',response)
      dispatch({
        type: 'CREATE_APPOINTMENT',
        payload: response.data,
      });
      setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }

    localStorage.removeItem('pet')
  };

  const updateAppointment = async data => {
    try {
      const response = await axios.put(
        `http://localhost:8080/appointment`,
        data,
      );
      dispatch({
        type: 'UPDATE_APPOINTMENT',
        payload: response.data,
      });
      setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const onSubmit = async data => {
    console.log('Inicio cadastro',data)
    if (appoint.id) {
      console.log('Update Agendamento',data,appoint)
      data.id = appoint.id;
      await updateAppointment(data);
    } else {
      console.log('Cria Agendamento',data,appoint)
      await createAppointment(data);
    }
  };

  if (redirect) {
    return <Redirect to="/agendamentos" />;
  }

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <h1 style={{ marginTop: "1em" }}>
          {appoint.id ? "Editar Agendamento" : "Criar novo Agendamento"}
        </h1>
        <Form onSubmit={handleSubmit(onSubmit)} loading={state.loading}>
          <Form.Group widths="equal">
            <Form.Field className={classnames({ error: errors.name })}>
              <label htmlFor="name">
                Nome:
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  ref={register({ required: true, minLength: 2 })}
                />
              </label>
              <span className="error">
                {errors.name &&
                  errors.name.type === 'required' &&
                  'É necessário um nome para o Pet'}
              </span>
              <span className="error">
                {errors.name &&
                  errors.name.type === 'minLength' &&
                  'Nome do Pet deve ter pelo menos 3 caracteres'}
              </span>
            </Form.Field>
            <Form.Field className={classnames({ error: errors.name })}>
              <label htmlFor="peso">
                Peso:
                <input
                  id="peso"
                  name="peso"
                  type="text"
                  placeholder="Peso"
                  ref={register({ required: true, minLength: 2 })}
                />
              </label>
              <span className="error">
                {errors.name &&
                  errors.name.type === 'required' &&
                  'Necessário informar o peso'}
              </span>
              <span className="error">
                {errors.name &&
                  errors.name.type === 'minLength' &&
                  'Must be 2 or more characters'}
              </span>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field className={classnames({ error: errors.species })}>
              <label htmlFor="species">
                Espécie:
                <input
                  id="species"
                  name="species"
                  type="text"
                  placeholder="Species"
                  ref={register({
                    required: true
                  })}
                />
              </label>
              <span className="error">
                {errors.species &&
                  errors.species.type === 'required' &&
                  'Necessário informar espécie do Pet'}
              </span>
            </Form.Field>
            <Form.Field className={classnames({ error: errors.species })}>
              <label htmlFor="dateOfBirth">
                Espécie:
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  placeholder="Data de Nascimento"
                  ref={register({
                    required: true
                  })}
                />
              </label>
              <span className="error">
                {errors.species &&
                  errors.species.type === 'required' &&
                  'Necessário informar data de nascimento'}
              </span>
            </Form.Field>
          </Form.Group>
          <Button primary type="button" onClick={() => (setRedirect(true))}>
            Cancelar
          </Button>
          <Button primary type="submit">
            Salvar
          </Button>

        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default AppointForm;