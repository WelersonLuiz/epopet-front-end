import React, { useReducer, createContext } from 'react';

export const AppointmentContext = createContext();

const initialState = {
  appointments: [],
  appointment: {},
  message: {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_APPOINTMENT': {
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
        message: {
          type: 'success',
          title: 'Success',
          content: 'Novo agendamento criado com sucesso',
        },
      };
    }
    case 'FETCH_APPOINTMENTS': {
      return {
        ...state,
        appointments: action.payload,
      };
    }
    case 'FETCH_APPOINTMENT': {
      return {
        ...state,
        appoint: action.payload,
      };
    }
    case 'UPDATE_APPOINTMENT': {
      const appointment = action.payload;
      return {
        ...state,
        appointments: state.appointments.map(item =>
          item._id === appointment._id ? appointment : item,
        ),
        message: {
          type: 'success',
          title: 'Update Successful',
          content: `Agendamento "${appointment.id}" has been updated!`,
        },
      };
    }
    case 'DELETE_APPOINTMENT': {
      const id = action.payload;
      return {
        ...state,
        appointments: state.appointments.filter(item => item.id !== id),
        message: {
          type: 'success',
          title: 'Deletado com sucesso',
          content: `Agendamento foi deletado!`,
        },
      };
    }
    case 'FLASH_MESSAGE': {
      return {
        ...state,
        message: action.payload,
      };
    }
    default:
      throw new Error();
  }
}

export const AppointmentContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <AppointmentContext.Provider value={[state, dispatch]}>
      {children}
    </AppointmentContext.Provider>
  );
};
