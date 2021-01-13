/* eslint-disable no-unused-expressions */
/* eslint-disable no-debugger */
import axios from 'axios';
import actionTypes from './actionTypes';

const endpoint = 'https://api.themoviedb.org/3/movie/now_playing?api_key=a855a03716794c53b1334d5e9754e04a&language=en-US&page=1&region=US';
const endpoint1 = 'https://api.themoviedb.org/3/movie/popular?api_key=a855a03716794c53b1334d5e9754e04a&language=en-US&page=1';
const endpoint2 = 'https://api.themoviedb.org/3/movie/upcoming?api_key=a855a03716794c53b1334d5e9754e04a&language=en-US&page=1&region=US';

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

function loadMoviesError(error) {
  return {
    type: actionTypes.LOAD_MOVIES_ERROR,
    error,
  };
}

function loadMoviesSucces(allMovies, categories) {
  return {
    type: actionTypes.LOAD_MOVIES,
    allMovies,
    categories,
  };
}

export function loadMovies() {
  return async (dispatch) => {
    debugger;
    try {
      const upComing = await axios.get(endpoint);
      const popular = await axios.get(endpoint1);
      const nowPlaying = await axios.get(endpoint2);

      const allMovies = {
        UpComing: upComing.data.results,
        Popular: popular.data.results,
        NowPlaying: nowPlaying.data.results,
      };

      const categories = Object.keys(allMovies);

      dispatch(loadMoviesSucces(allMovies, categories));
    } catch (error) {
      dispatch(loadMoviesError(error));
    }
  };
}
