import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MoviesListComponent from './MoviesList';
import configureStore from '../../redux/configureStore';

jest.mock('../../redux/actions/movieAction.js');

describe('Given MovieList component', () => {
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

  describe('When state has allMovies loaded', () => {
    let initialState;
    const fakePath = 'https://image.tmdb.org/t/p/w500/fake-poster-path';
    beforeEach(() => {
      initialState = {
        movieReducer: {
          allMovies: {
            upComing: [
              {
                id: 10,
                poster_path: 'fake-poster-path',
                original_title: 'Fake Title',
              },
            ],
          },
        },
      };
    });

    test('Then should render an unordered list with className image-wrapper', () => {
      wrapper = wrapperFactory(initialState);

      render(<MoviesListComponent movies="upComing" />, { wrapper });

      expect(document.querySelector('.image-wrapper')).toBeInTheDocument();
    });

    test(`Then should render a list item with source ${fakePath}`, () => {
      wrapper = wrapperFactory(initialState);

      render(<MoviesListComponent movies="upComing" />, { wrapper });

      expect(document.querySelector('.movie-photo').src).toBe(fakePath);
    });
  });
});
