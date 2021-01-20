import axios from 'axios';
import { loadBySearch, loadMovies, getSimilarMovie } from './movieAction';
import actionTypes from './actionTypes';

jest.mock('axios');

describe('Given movieActions', () => {
  let dispatch = null;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  afterEach(() => {
    dispatch.mockClear();
    axios.get.mockClear();
  });

  describe('When loadBySearch is called', () => {
    describe('And axios get method respond with an array of movies', () => {
      test(`Then should call dispatch with an object with action type ${actionTypes.LOAD_MOVIE_BY_SEARCH} and an array of movies`, async () => {
        axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: { results: ['MovieOne', 'MovieTwo'] } }));

        const expectedAction = { type: actionTypes.LOAD_MOVIE_BY_SEARCH, moviesList: ['MovieOne', 'MovieTwo'] };

        await loadBySearch()(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);
      });
    });

    describe('And axios get method respond with an error', () => {
      test(`Then should call dispatch with an object with action type ${actionTypes.LOAD_MOVIE_BY_SEARCH_ERROR} and the error`, async () => {
        axios.get = jest.fn().mockImplementation(() => Promise.reject(new Error('Error message')));

        const expectedAction = { type: actionTypes.LOAD_MOVIE_BY_SEARCH_ERROR, error: 'Error message' };

        await loadBySearch()(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);
      });
    });
  });

  describe('When loadMovies is called', () => {
    describe('And axios get method respond with movies lists', () => {
      test(`Then it should call dispatch with an object with type ${actionTypes.LOAD_MOVIES}, allMovies and categories`, async () => {
        axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: { results: ['MovieOne', 'MovieTwo'] } }));

        const expectedAction = {
          type: actionTypes.LOAD_MOVIES,
          allMovies: {
            'Up Comming': ['MovieOne', 'MovieTwo'],
            Popular: ['MovieOne', 'MovieTwo'],
            'Now Playing': ['MovieOne', 'MovieTwo'],
          },
          categories: ['Up Comming', 'Popular', 'Now Playing'],
        };

        await loadMovies()(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);
      });
    });

    describe('And axios get method respond with an error message', () => {
      test(`Then it should call dispatch with an object with type ${actionTypes.LOAD_MOVIES_ERROR} and the error message`, async () => {
        axios.get = jest.fn().mockImplementation(() => Promise.reject(new Error('Error message')));

        const expectedAction = {
          type: actionTypes.LOAD_MOVIES_ERROR,
          error: 'Error message',
        };

        await loadMovies()(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);
      });
    });
  });

  describe('When getSimilarMovie is called', () => {
    describe('And axios get method repond with an array of similar movies', () => {
      test(`Then should call dispatch with an object with type ${actionTypes.LOAD_SIMILAR} and an array of similar movies`, async () => {
        axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: { results: ['Similar MovieOne', 'Similar MovieTwo'] } }));

        const expectedAction = { type: actionTypes.LOAD_SIMILAR, similar: ['Similar MovieOne', 'Similar MovieTwo'] };

        await getSimilarMovie(12)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);
      });
    });

    describe('And axios get method repond with an error', () => {
      test(`Then should call dispatch with an object with type ${actionTypes.LOAD_SIMILAR_ERROR} and an array of similar movies`, async () => {
        axios.get = jest.fn().mockImplementation(() => Promise.reject(new Error('Error message')));

        const expectedAction = { type: actionTypes.LOAD_SIMILAR_ERROR, error: 'Error message' };

        await getSimilarMovie(12)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);
      });
    });
  });
});
