/* eslint-disable no-debugger */
import actionTypes from '../actions/actionTypes';

const initialState = { isLogged: false };

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return {
        ...state,
        getUserDB: action.user,
      };
    case actionTypes.GET_USER:
      return {
        ...state,
        getUserDB: action.getUserDB,
      };

    case actionTypes.ADD_FAVOURITE:
      return {
        ...state,
        getUserDB: action.userDB,
      };
    case actionTypes.DELETE_FAVOURITE:
      return {
        ...state,
        getUserDB: action.userDB,
      };
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        getUserDB: null,
      };

    default:
      return state;
  }
}
