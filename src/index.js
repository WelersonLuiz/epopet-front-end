import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'fomantic-ui-css/semantic.min.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PetContextProvider } from './context/pet-context';
import { BusinessContextProvider } from './context/business-context';

localStorage.setItem('StatusLogin',false)

ReactDOM.render(
  <BusinessContextProvider>
    <PetContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PetContextProvider>
  </BusinessContextProvider>,
  document.getElementById("root")
);
