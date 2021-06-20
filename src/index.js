import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'fomantic-ui-css/semantic.min.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PetContextProvider } from './context/pet-context';

localStorage.setItem('StatusLogin',false)

ReactDOM.render(
  <PetContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PetContextProvider>,
  document.getElementById('root')
);
