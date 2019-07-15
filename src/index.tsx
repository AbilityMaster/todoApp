import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css'
import Api from "./api";
import {applyMiddleware, compose, createStore} from "redux";
import { createReducer } from './reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

let apiApp = new Api();
const sagaMiddleware = createSagaMiddleware();
const initialState = {};

const store = createStore(createReducer(), initialState, compose(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(sagas, apiApp);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
