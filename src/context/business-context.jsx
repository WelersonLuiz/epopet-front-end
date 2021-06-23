import React, { useReducer, createContext } from 'react';

export const BusinessContext = createContext();

const initialState = {
  businesses: [],
  business: {},
  message: {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_BUSINESS': {
      return {
        ...state,
        businesses: [...state.businesses, action.payload],
        message: {
          type: 'success',
          title: 'Success',
          content: 'New Business created!',
        },
      };
    }
    case 'FETCH_BUSINESSES': {
      return {
        ...state,
        businesses: action.payload,
      };
    }
    case 'FETCH_BUSINESS': {
      return {
        ...state,
        business: action.payload,
      };
    }
    case 'UPDATE_BUSINESS': {
      const business = action.payload;
      return {
        ...state,
        businesses: state.businesses.map(item =>
          item._id === business._id ? business : item,
        ),
        message: {
          type: 'success',
          title: 'Update Successful',
          content: `Business "${business.name}" has been updated!`,
        },
      };
    }
    case 'DELETE_BUSINESS': {
      const id = action.payload;
      return {
        ...state,
        businesses: state.businesses.filter(item => item.id !== id),
        message: {
          type: 'success',
          title: 'Delete Successful',
          content: `Business has been deleted!`,
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

export const BusinessContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <BusinessContext.Provider value={[state, dispatch]}>
      {children}
    </BusinessContext.Provider>
  );
};
