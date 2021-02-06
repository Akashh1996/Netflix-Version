import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({ movieReducer, userReducer });

export default rootReducer;
