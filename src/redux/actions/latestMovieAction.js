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
    debugger;
    try {
      const { data: { results } } = await axios.get(endpoint);
      dispatch(loadNowPlayingSuccess(results));
    } catch (error) {
      dispatch(loadNowPlayingError);
    }
  };
}
