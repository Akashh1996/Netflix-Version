import actionTypes from '../actions/actionTypes';

const initialState = {};

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_MOVIES:
      return {
        ...state,
        allMovies: action.allMovies,
        categories: action.categories,
      };
    case actionTypes.LOAD_MOVIES_ERROR:
      return {
        ...state,
        allMovies: action.allMovies,
        allMovieError: action.error,
      };
    case actionTypes.LOAD_MOVIE_BY_SEARCH:
      return {
        ...state,
        moviesList: action.moviesList,
      };
    case actionTypes.LOAD_MOVIE_BY_SEARCH_ERROR:
      return {
        ...state,
        searchError: action.error,
      };
    case actionTypes.LOAD_SIMILAR:
      return {
        ...state,
        similar: action.similar,
      };
    case actionTypes.LOAD_SIMILAR_ERROR:
      return {
        ...state,
        similarMovieError: action.error,
      };
    case actionTypes.LOAD_VIDEO:
      return {
        ...state,
        video: action.video,
      };
    case actionTypes.LOAD_VIDEO_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
