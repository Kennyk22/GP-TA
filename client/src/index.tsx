import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from '@auth0/auth0-react'
import {compose, createStore} from 'redux'
import { Provider } from 'react-redux';
import Reducer from './Reducer/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const store = createStore(Reducer, composeEnhancers())

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={'dev-nuxp1yqmbgbv4efn.us.auth0.com'}
      clientId={'bZp5c32OcQPovJab7resxLMaVnaB9CI5'}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "gpt-tapi.com",
        scope: 'openid profile email'
      }}>
        <Provider store={store}>
          <App />
        </Provider>
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
