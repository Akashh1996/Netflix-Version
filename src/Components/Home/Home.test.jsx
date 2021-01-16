/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../../redux/configureStore';
import Home from './Home';
import { loadMovies } from '../../redux/actions/movieAction';

jest.mock('../../redux/actions/movieAction');

describe('Given The Home Component', () => {
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

  describe('When all movies is loaded in the state', () => {
    let initialState;

    beforeEach(() => {
      initialState = {
        movieReducer: {
          allMovies: {

          },
          categories: ['popular'],
        },
      };
    });

    test('Then the component should contain the movie description in the document ', () => {
      wrapper = wrapperFactory(initialState);

      render(<Home />, { wrapper });

      expect(document.querySelector('.movie-description')).toBeInTheDocument();
    });

    test('Then the categories should be rendered in the MovieList component', () => {
      wrapper = wrapperFactory(initialState);

      render(<Home />, { wrapper });

      expect(document.querySelector('.movie-category').innerHTML).toBe('popular');
    });
  });

  describe('When all movies is not loaded', () => {
    let initialState;
    test('Then the component should call the loadMovie function ', () => {
      initialState = {
        movieReducer: {
          allMovies: null,
        },
      };
      wrapper = wrapperFactory(initialState);

      render(<Home />, { wrapper });

      expect(loadMovies).toHaveBeenCalled();
    });
  });
});
