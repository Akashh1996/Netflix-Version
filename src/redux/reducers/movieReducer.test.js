import movieReducer from './movieReducer';
import actionTypes from '../actions/actionTypes';

describe('Given movieReducer function', () => {
  let newState = null;

  afterEach(() => {
    newState = null;
  });

  describe('When state is undefined', () => {
    test('Then return an empty object', () => {
      newState = movieReducer(undefined, true);

      expect(newState).toEqual({});
    });
  });

  describe('When state and action are empty objects', () => {
    test('Then return an empty object', () => {
      newState = movieReducer({}, {});
      expect(newState).toEqual({});
    });
  });

  describe(`When action type is ${actionTypes.LOAD_MOVIES}`, () => {
    test('Then return an object with allMovies and their categories', () => {
      const action = {
        type: actionTypes.LOAD_MOVIES,
        allMovies: {
          'Up Coming': ['MovieOne', 'MovieTwo'],
          Popular: ['MovieOne', 'MovieTwo'],
          'Now Playing': ['MovieOne', 'MovieTwo'],
        },
        categories: ['MovieOne', 'MovieTwo'],

      };

      const compareState = {
        allMovies: {
          'Up Coming': ['MovieOne', 'MovieTwo'],
          Popular: ['MovieOne', 'MovieTwo'],
          'Now Playing': ['MovieOne', 'MovieTwo'],
        },
        categories: ['MovieOne', 'MovieTwo'],

      };

      newState = movieReducer({}, action);

      expect(newState).toEqual(compareState);
    });
  });

  describe(`When action type is ${actionTypes.LOAD_MOVIES_ERROR}`, () => {
    test('Then return an object with an error', () => {
      const action = {
        type: actionTypes.LOAD_MOVIES_ERROR,
        error: 'Error Message',
      };

      const compareState = {
        allMoviesError: 'Error Message',
      };

      newState = movieReducer({}, action);

      expect(newState).toEqual(compareState);
    });
  });

  describe(`When action type is ${actionTypes.LOAD_MOVIE_BY_SEARCH}`, () => {
    test('Then return an object with the previous state plus movie list array', () => {
      const initialState = {
        allMovies: {
          'Up Coming': ['MovieOne', 'MovieTwo'],
          Popular: ['MovieOne', 'MovieTwo'],
          'Now Playing': ['MovieOne', 'MovieTwo'],
        },
        categories: ['MovieOne', 'MovieTwo'],
      };

      const action = {
        type: actionTypes.LOAD_MOVIE_BY_SEARCH,
        moviesList: ['FirstMovie', 'SecondMovie'],
      };

      newState = movieReducer(initialState, action);

      expect(newState).toEqual({ ...initialState, moviesList: action.moviesList });
    });

    describe(`When action type is ${actionTypes.LOAD_MOVIE_BY_SEARCH_ERROR}`, () => {
      test('Then return an object with search error', () => {
        const initialState = {
          allMovies: {
            'Up Coming': ['MovieOne', 'MovieTwo'],
            Popular: ['MovieOne', 'MovieTwo'],
            'Now Playing': ['MovieOne', 'MovieTwo'],
          },
          categories: ['MovieOne', 'MovieTwo'],
        };

        const action = {
          type: actionTypes.LOAD_MOVIE_BY_SEARCH_ERROR,
          error: 'Error Message',
        };

        newState = movieReducer(initialState, action);

        expect(newState).toEqual({ ...initialState, searchError: 'Error Message' });
      });
    });
  });

  describe(`When action type is ${actionTypes.LOAD_SIMILAR}`, () => {
    test('Then return an object with previous state', () => {
      const initialState = {
        allMovies: {
          'Up Coming': ['MovieOne', 'MovieTwo'],
          Popular: ['MovieOne', 'MovieTwo'],
          'Now Playing': ['MovieOne', 'MovieTwo'],
        },
        categories: ['MovieOne', 'MovieTwo'],
      };

      const action = {
        type: actionTypes.LOAD_SIMILAR,
        similar: ['SimilarFirstMovie', 'SimilarSecondMovie'],
      };

      newState = movieReducer(initialState, action);

      expect(newState).toEqual({ ...initialState, similar: action.similar });
    });
  });

  describe(`When action type is ${actionTypes.LOAD_SIMILAR_ERROR}`, () => {
    test('Then return an object with similar movie error', () => {
      const initialState = {
        allMovies: {
          'Up Coming': ['MovieOne', 'MovieTwo'],
          Popular: ['MovieOne', 'MovieTwo'],
          'Now Playing': ['MovieOne', 'MovieTwo'],
        },
        categories: ['MovieOne', 'MovieTwo'],
      };

      const action = {
        type: actionTypes.LOAD_SIMILAR_ERROR,
        error: 'Error Message',
      };

      newState = movieReducer(initialState, action);

      expect(newState).toEqual({ ...initialState, similarMovieError: 'Error Message' });
    });
  });
});
