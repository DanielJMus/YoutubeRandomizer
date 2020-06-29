import { createStore, applyMiddleware } from 'redux';
import reducer from './Reducers/reducer';
import {Provider} from 'react-redux';
import App from './App';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;