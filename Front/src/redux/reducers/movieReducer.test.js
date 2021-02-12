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
        loading: false,

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

      expect(newState).toEqual({ ...initialState, moviesList: action.moviesList, loading: false });
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

      expect(newState).toEqual({ ...initialState, similar: action.similar, loading: false });
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

  describe(`When action type is ${actionTypes.SET_LOADING}`, () => {
    test('Then return an object with propertie loading true', () => {
      const initialState = {};

      const expectedState = {
        ...initialState,
        loading: true,
      };

      const action = {
        type: actionTypes.SET_LOADING,
      };

      newState = movieReducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe(`When action type is ${actionTypes.LOAD_VIDEO}`, () => {
    test('Then return an object with video and set loading to false', () => {
      const initialState = {};

      const expectedState = {
        ...initialState,
        video: 'Video',
        loading: false,
      };

      const action = {
        type: actionTypes.LOAD_VIDEO,
        video: 'Video',
      };

      newState = movieReducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe(`When action type is ${actionTypes.LOAD_VIDEO_ERROR}`, () => {
    test('Then return an object with video error message and set loading to false', () => {
      const initialState = {};

      const expectedState = {
        ...initialState,
        videoError: 'Error Message',
        loading: false,
      };

      const action = {
        type: actionTypes.LOAD_VIDEO_ERROR,
        error: 'Error Message',
      };

      newState = movieReducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe(`When action type is ${actionTypes.LOAD_MOVIE_DETAIL}`, () => {
    test('Then return an object with movie detail', () => {
      const initialState = {};

      const expectedState = {
        ...initialState,
        movieDetail: 'This is the movie detail',
      };

      const action = {
        type: actionTypes.LOAD_MOVIE_DETAIL,
        movieDetail: 'This is the movie detail',
      };

      newState = movieReducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe(`When action type is ${actionTypes.LOAD_CAST}`, () => {
    test('Then return an object with an array of movie cast', () => {
      const initialState = {};

      const expectedState = {
        ...initialState,
        cast: ['CastMemberOne', 'CastMemberTwo', 'CastMemberThree'],
      };

      const action = {
        type: actionTypes.LOAD_CAST,
        cast: ['CastMemberOne', 'CastMemberTwo', 'CastMemberThree'],
      };

      newState = movieReducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe(`When action type is ${actionTypes.CLEAR_DETAIL}`, () => {
    test('Then return an object setting cast, video and movieDetail to null', () => {
      const initialState = {
        allMovies: {
          'Up Coming': ['MovieOne', 'MovieTwo'],
          Popular: ['MovieOne', 'MovieTwo'],
          'Now Playing': ['MovieOne', 'MovieTwo'],
        },
        categories: ['MovieOne', 'MovieTwo'],
        video: 'Video',
        cast: ['CastMemberOne', 'CastMemberTwo', 'CastMemberThree'],
        movieDetail: 'This is the movie detail',
      };

      const expectedState = {
        ...initialState,
        cast: null,
        video: null,
        movieDetail: null,
      };

      const action = {
        type: actionTypes.CLEAR_DETAIL,
      };

      newState = movieReducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });
});
