import { combineReducers } from 'redux';
import movieReducer from './movieReducer';

const rootReducer = combineReducers({ movieReducer });

export default rootReducer;
