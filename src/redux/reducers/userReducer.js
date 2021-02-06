/* eslint-disable no-debugger */
import actionTypes from '../actions/actionTypes';

const initialState = { isLogged: false };

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      debugger;
      return {
        ...state,
        user: action.user,
        isLogged: true,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        user: null,
        isLogged: false,
      };

    default:
      return state;
  }
}
