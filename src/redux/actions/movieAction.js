/* eslint-disable no-unused-expressions */
/* eslint-disable no-debugger */
import axios from 'axios';
import actionTypes from './actionTypes';

const endpoint = 'https://api.themoviedb.org/3/movie/now_playing?api_key=a855a03716794c53b1334d5e9754e04a&language=en-US&page=1&region=US';
const endpoint1 = 'https://api.themoviedb.org/3/movie/popular?api_key=a855a03716794c53b1334d5e9754e04a&language=en-US&page=1';
const endpoint3 = 'https://api.themoviedb.org/3/movie/upcoming?api_key=a855a03716794c53b1334d5e9754e04a&language=en-US&page=1&region=US';

export function loadNowPlayingSuccess(nowPlaying) {
  return nowPlaying;
}

export function loadNowPlayingError(error) {
  return {
    type: actionTypes.LOAD_NOW_PLAYING_ERROR,
    error,
  };
}

export function loadNowPlaying() {
  return async (dispatch) => {
    try {
      const { data: { results } } = await axios.get(endpoint);
      loadNowPlayingSuccess(results);
    } catch (error) {
      dispatch(loadNowPlayingError);
    }
  };
}

export function loadPopularSuccess(popular) {
  return popular;
}

export function loadPopularError(error) {
  return {
    type: actionTypes.LOAD_POPULAR_ERROR,
    error,
  };
}

export function loadPopular() {
  return async (dispatch) => {
    try {
      const { data: { results } } = await axios.get(endpoint1);
      loadPopularSuccess(results);
    } catch (error) {
      dispatch(loadPopularError);
    }
  };
}
export function loadUpCommingSuccess(upComming) {
  return upComming;
}

export function loadUpCommingError(error) {
  return {
    type: actionTypes.LOAD_UPCOMMING_ERROR,
    error,
  };
}

export function loadUpComming() {
  return async (dispatch) => {
    try {
      const { data: { results } } = await axios.get(endpoint3);
      loadUpCommingSuccess(results);
    } catch (error) {
      dispatch(loadUpCommingError);
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

function loadMoviesError(error) {
  return {
    type: actionTypes.LOAD_MOVIES_ERROR,
    error,
  };
}

function loadMoviesSucces(allMovies) {
  return {
    type: actionTypes.LOAD_MOVIES,
    allMovies,
  };
}

export function loadMovies() {
  return async (dispatch) => {
    debugger;
    try {
      const upComing = await axios.get(endpoint);
      const popular = await axios.get(endpoint1);
      const nowPlaying = await axios.get(endpoint3);
      const allMovies = {
        upComing: upComing.data.results,
        popular: popular.data.results,
        nowPlaying: nowPlaying.data.results,
      };
      console.log(allMovies);
      dispatch(loadMoviesSucces(allMovies));
    } catch (error) {
      dispatch(loadMoviesError(error));
    }
  };
}
