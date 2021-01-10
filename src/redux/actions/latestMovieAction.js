/* eslint-disable no-debugger */
import axios from 'axios';
import actionTypes from './actionTypes';

const endpoint = 'https://api.themoviedb.org/3/movie/now_playing?api_key=a855a03716794c53b1334d5e9754e04a&language=en-US&page=1&region=US';

export default function loadNowPlayingSuccess(nowPlaying) {
  return {
    type: actionTypes.LOAD_LATEST_MOVIES,
    nowPlaying,
  };
}

export function loadNowPlayingError(error) {
  return {
    type: actionTypes.LOAD_LATEST_MOVIES_ERROR,
    error,
  };
}

export function loadNowPlaying() {
  return async (dispatch) => {
    try {
      const { data: { results } } = await axios.get(endpoint);
      dispatch(loadNowPlayingSuccess(results));
    } catch (error) {
      dispatch(loadNowPlayingError);
    }
  };
}

export function loadBYSearchSuccess(moviesList) {
  return {
    type: actionTypes.LOAD_MOVIE_BY_SEARCH,
    moviesList,
  };
}

export function loadBYSearchError(error) {
  return {
    type: actionTypes.LOAD_MOVIE_BY_SEARCH_ERROR,
    error,
  };
}

export function loadBySearch(name) {
  return async (dispatch) => {
    try {
      const { data: { results } } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a855a03716794c53b1334d5e9754e04a&language=en-US&query=${name}&page=1&include_adult=false`);
      dispatch(loadBYSearchSuccess(results));
    } catch (error) {
      dispatch(loadBYSearchError);
    }
  };
}

export function saveQuery(query) {
  return {
    type: actionTypes.SAVE_QUERY,
    query,
  };
}
