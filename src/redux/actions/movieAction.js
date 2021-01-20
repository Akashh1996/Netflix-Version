/* eslint-disable no-unused-expressions */
/* eslint-disable no-debugger */
import axios from 'axios';
import actionTypes from './actionTypes';

const API_KEY = 'a855a03716794c53b1334d5e9754e04a';
const endpoint = 'https://api.themoviedb.org/3';
const upComingURL = `${endpoint}/movie/upcoming`;
const popularURL = `${endpoint}/movie/popular`;
const nowPlayingURL = `${endpoint}/movie/now_playing`;
const searchURL = `${endpoint}/search/movie`;
const similarMovieURL = `${endpoint}/movie`;

const params = {
  api_key: API_KEY,
  language: 'en_US',
  page: 1,
  region: 'US',
};

function loadBYSearchSuccess(moviesList) {
  return {
    type: actionTypes.LOAD_MOVIE_BY_SEARCH,
    moviesList,
  };
}

function loadBYSearchError(error) {
  return {
    type: actionTypes.LOAD_MOVIE_BY_SEARCH_ERROR,
    error,
  };
}

export function loadBySearch(name) {
  return async (dispatch) => {
    try {
      const { data: { results } } = await axios.get(searchURL, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          query: name,
          page: 1,
          include_adult: false,
        },
      });
      dispatch(loadBYSearchSuccess(results));
    } catch ({ message }) {
      dispatch(loadBYSearchError(message));
    }
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
    try {
      const upComing = await axios.get(upComingURL, {
        params,
      });
      const popular = await axios.get(popularURL, {
        params,
      });
      const nowPlaying = await axios.get(nowPlayingURL, {
        params,
      });
      const allMovies = {
        'Up Comming': upComing.data.results,
        Popular: popular.data.results,
        'Now Playing': nowPlaying.data.results,
      };
      const categories = Object.keys(allMovies);
      dispatch(loadMoviesSucces(allMovies, categories));
    } catch ({ message }) {
      dispatch(loadMoviesError(message));
    }
  };
}

function getSimilarMovieSuccess(similar) {
  return {
    type: actionTypes.LOAD_SIMILAR,
    similar,
  };
}

function getSimilarMovieError(error) {
  return {
    type: actionTypes.LOAD_SIMILAR_ERROR,
    error,
  };
}

export function getSimilarMovie(id) {
  return async (dispatch) => {
    try {
      const { data: { results } } = await axios.get(`${similarMovieURL}/${id}/similar`, {
        params,
      });
      dispatch(getSimilarMovieSuccess(results));
    } catch ({ message }) {
      dispatch(getSimilarMovieError(message));
    }
  };
}
