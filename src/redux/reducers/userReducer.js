/* eslint-disable no-debugger */
import actionTypes from '../actions/actionTypes';

const initialState = { };

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      debugger;
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
