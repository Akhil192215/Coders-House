import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/index'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>


    <App />
  
  </Provider> 
);


reportWebVitals();
