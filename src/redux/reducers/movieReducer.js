/* eslint-disable no-debugger */
import actionTypes from '../actions/actionTypes';

const initialState = {};

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_LATEST_MOVIES:
      debugger;
      return {
        ...state,
        nowPlaying: action.nowPlaying,
      };
    default:
      return state;
  }
}
