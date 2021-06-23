import React, { useReducer, createContext } from 'react';

export const AppointmentContext = createContext();

const initialState = {
  appoints: [],
  appoint: {}, // selected or new
  message: {}, // { type: 'success|fail', title:'Info|Error' content:'lorem ipsum'}
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_APPOINTMENT': {
      return {
        ...state,
        appoints: [...state.appoints, action.payload],
        message: {
          type: 'success',
          title: 'Success',
          content: 'Novo agendamento criado com sucesso',
        },
      };
    }
    case 'FETCH_APPOINTMENT': {
      return {
        ...state,
        appoints: action.payload,
      };
    }
    case 'FETCH_APPOINTMENT': {
      return {
        ...state,
        appoint: action.payload,
      };
    }
    case 'UPDATE_APPOINTMENT': {
      const appoint = action.payload;
      return {
        ...state,
        appoints: state.appoints.map(item =>
          item._id === appoint._id ? appoint : item,
        ),
        message: {
          type: 'success',
          title: 'Update Successful',
          content: `Agendamento "${appoint.id}" has been updated!`,
        },
      };
    }
    case 'DELETE_APPOINTMENT': {
      const id = action.payload;
      return {
        ...state,
        appoints: state.appoints.filter(item => item.id !== id),
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
