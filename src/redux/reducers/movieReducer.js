/* eslint-disable no-unused-expressions */
/* eslint-disable no-debugger */
import actionTypes from '../actions/actionTypes';

const initialState = {};

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_NOW_PLAYING:
      return {
        ...state,
        nowPlaying: action.nowPlaying,
      };
    case actionTypes.LOAD_MOVIE_BY_SEARCH:
      return {
        ...state,
        moviesList: action.moviesList,
      };
    case actionTypes.SAVE_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case actionTypes.LOAD_POPULAR:
      debugger;
      return {
        ...state,
        popular: action.popular,
      };
    case actionTypes.LOAD_UPCOMMING:
      debugger;
      return {
        ...state,
        upComming: action.upComming,
      };
    default:
      return state;
  }
}
