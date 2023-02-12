// Necessary imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session'
import { ModalProvider, Modal } from './context/Modal';

// Creating the store
const store = configureStore();

// If the environment is not production, set the store as a property on the window object to be able to interact with it on the browser console
if(process.env.NODE_ENV !== "production") {
  restoreCSRF()
  
  window.csrfFetch = csrfFetch
  window.store = store;
  window.sessionActions = sessionActions
}

// Wrap the application with the Modal provider and render the Modal component after the App component so that all the Modal content will be layered as HTML elements on top of all the other HTML elements

function Root() {
  return (
    <ModalProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
          <Modal />
        </BrowserRouter>
      </ReduxProvider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
