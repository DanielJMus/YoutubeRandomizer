import { createStore, applyMiddleware } from 'redux';
import allReducers from './Reducers';
import {Provider} from 'react-redux';
import App from './App';
import logger from 'redux-logger';

const store = createStore(allReducers, applyMiddleware(logger));

export default store;