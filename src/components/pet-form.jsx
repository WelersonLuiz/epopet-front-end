import React, { useContext, useState } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { PetContext } from '../context/pet-context';
import { flashErrorMessage } from './flash-message';
import {Context} from './authContext'


const PetForm = ({pet}) => {
  const [state, dispatch] = useContext(PetContext);
  const {user} = useContext(Context)
  const [redirect, setRedirect] = useState(false);
  const { register, errors, handleSubmit } = useForm({
    defaultValues: pet,
  });

  const createPet = async data => {

    
    data['id_client'] = user.id
    console.log('Criando Pet',data)
    try {
      const response = await axios.post('http://localhost:8080/pet', data);
      console.log('Responose',response)
      dispatch({
        type: 'CREATE_PET',
        payload: response.data,
      });
      setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const updatePet = async data => {
    try {
      const response = await axios.put(
        `http://localhost:8080/pet`,
        data,
      );
      dispatch({
        type: 'UPDATE_PET',
        payload: response.data,
      });
      setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const onSubmit = async data => {
    console.log('Inicio cadastro',data,pet)
    if (pet.id) {
      console.log('Update pet',data,pet)
      data.id = pet.id;
      await updatePet(data);
    } else {
      console.log('Cria pet',data,pet)
      await createPet(data);
    }
  };

  if (redirect) {
    return <Redirect to="/pets" />;
  }

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <h1 style={{ marginTop: "1em" }}>
          {pet.id ? "Edit Pet" : "Add New Pet"}
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
                  'You need to provide Name'}
              </span>
              <span className="error">
                {errors.name &&
                  errors.name.type === 'minLength' &&
                  'Must be 2 or more characters'}
              </span>
            </Form.Field>
            <Form.Field className={classnames({ error: errors.name })}>
              <label htmlFor="name">
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
                  'You need to provide Name'}
              </span>
              <span className="error">
                {errors.name &&
                  errors.name.type === 'minLength' &&
                  'Must be 2 or more characters'}
              </span>
            </Form.Field>
          </Form.Group>
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
                'You need to provide a Species'}
            </span>
          </Form.Field>
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

export default PetForm;
