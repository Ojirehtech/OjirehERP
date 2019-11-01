import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from "./store/reducers/index";
import './index.css';
import App from './App';

const store = createStore(
  rootReducer,
  composeWithDevTools( applyMiddleware( thunk, logger ) )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById( 'root' ) );
  