import React, { useContext, useState } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { PetContext } from '../context/pet-context';
import { flashErrorMessage } from './flash-message';

const PetForm = ({pet}) => {
  const [state, dispatch] = useContext(PetContext);
  const [redirect, setRedirect] = useState(false);
  const { register, errors, handleSubmit } = useForm({
    defaultValues: pet,
  });

  const createPet = async data => {
    try {
      const response = await axios.post('http://localhost:8080/pet', data);
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
    if (pet.id) {
      data.id = pet.id;
      await updatePet(data);
    } else {
      await createPet(data);
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
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
                Name
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
          </Form.Group>
          <Form.Field className={classnames({ error: errors.species })}>
            <label htmlFor="species">
              Species
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
          <Button primary type="submit">
            Save
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default PetForm;
