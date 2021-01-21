import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import SearchCommon from './SearchCommon';
import configureStore from '../../redux/configureStore';

jest.mock('../../redux/actions/movieAction.js');

describe('Given the SearchCommon component', () => {
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

  describe('When the component recives array of movies as props', () => {
    let initialState;
    let movies;
    const mockImageURL = 'https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg';
    beforeEach(() => {
      initialState = {
        movieReducer: {

        },
      };
      movies = [
        {
          poster_path: 'kqjL17yufvn9OVLyXYpvtyrFfak.jpg',
        },
      ];
    });

    test('Then the component render an unordered list with className image-wrapper', () => {
      wrapper = wrapperFactory(initialState);

      render(<SearchCommon movies={movies} />, { wrapper });

      expect(document.querySelector('.image-wrapper')).toBeInTheDocument();
    });

    test('Then the component should render the image with mockImageURL', () => {
      wrapper = wrapperFactory(initialState);

      render(<SearchCommon movies={movies} />, { wrapper });

      expect(document.querySelector('.movie-photo').src).toBe(mockImageURL);
    });
  });
});
