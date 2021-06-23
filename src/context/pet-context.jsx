import React, { useReducer, createContext } from 'react';

export const PetContext = createContext();

const initialState = {
  pets: [],
  pet: {},
  message: {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_PET': {
      return {
        ...state,
        pets: [...state.pets, action.payload],
        message: {
          type: 'success',
          title: 'Success',
          content: 'New Pet created!',
        },
      };
    }
    case 'FETCH_PETS': {
      return {
        ...state,
        pets: action.payload,
      };
    }
    case 'FETCH_PET': {
      return {
        ...state,
        pet: action.payload,
      };
    }
    case 'UPDATE_PET': {
      const pet = action.payload;
      return {
        ...state,
        pets: state.pets.map(item =>
          item._id === pet._id ? pet : item,
        ),
        message: {
          type: 'success',
          title: 'Update Successful',
          content: `Pet "${pet.name}" has been updated!`,
        },
      };
    }
    case 'DELETE_PET': {
      const id = action.payload;
      return {
        ...state,
        pets: state.pets.filter(item => item.id !== id),
        message: {
          type: 'success',
          title: 'Delete Successful',
          content: `Pet has been deleted!`,
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

export const PetContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <PetContext.Provider value={[state, dispatch]}>
      {children}
    </PetContext.Provider>
  );
};
