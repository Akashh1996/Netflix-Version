import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../../redux/configureStore';
import SearchResult from './SearchResult';
import { getSimilarMovie } from '../../redux/actions/movieAction';

jest.mock('../../redux/actions/movieAction');

describe('Given The SearchResult Component', () => {
  let wrapper = null;
  let store = null;

  const wrapperFactory = (wrapperInitialState) => {
    store = configureStore(wrapperInitialState);
    store.dispatch = jest.fn();

    return ({ children }) => (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
  };

  afterEach(() => {
    jest.restoreAllMocks();
    wrapper = null;
  });

  describe('When similarmovie,error and searchMovieResult is loaded in the state', () => {
    const mockURL = 'https://image.tmdb.org/t/p/w500/KJHGFTYJKLIUDH.jpg';
    let initialState;
    beforeEach(() => {
      initialState = {
        movieReducer: {
          moviesList: [
            {
              id: 1234,
              poster_path: 'KJHGFTYJKLIUDH.jpg',

            },
          ],
          similar: [
            {
              poster_path: 'KJHGFTYJKLIUDH.jpg',
            },
          ],
          similarMovieError: [
            {
              error: '404 error',
            },
          ],
        },
      };
    });

    test('Then the component should contain the image', () => {
      wrapper = wrapperFactory(initialState);

      render(<SearchResult />, { wrapper });

      expect(document.querySelector('.movie-photo')).toBeInTheDocument();
    });

    test('Then the component should render with image url mockURL ', () => {
      wrapper = wrapperFactory(initialState);

      render(<SearchResult />, { wrapper });

      expect(document.querySelector('.movie-photo').src).toBe(mockURL);
    });

    test('Then the component should render with text "similar movie error" ', () => {
      wrapper = wrapperFactory(initialState);

      render(<SearchResult />, { wrapper });

      expect(document.querySelector('.similar-movie__error').innerHTML).toBe('similar movie error');
    });

    test('Then getSimilarMovie action should be called ', () => {
      wrapper = wrapperFactory(initialState);

      render(<SearchResult />, { wrapper });

      expect(getSimilarMovie).toHaveBeenCalled();
    });
  });

  describe('when similar movie and searchmovieresult is not loaded in the state', () => {
    let initialState;
    test('Then the component should render text with not-exist className', () => {
      initialState = {
        movieReducer: {
          similar: [],
          moviesList: [],
        },
      };
      wrapper = wrapperFactory(initialState);

      render(<SearchResult />, { wrapper });

      expect(document.querySelector('.not-exist')).toBeInTheDocument();
    });
  });
});
