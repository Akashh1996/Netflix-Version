import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../../redux/configureStore';
import Detail from './Detail';
import { loadVideo, loadMovieDetail, loadMovieCast } from '../../redux/actions/movieAction';

jest.mock('../../redux/actions/movieAction');

describe('Given Detail Component', () => {
  let wrapper = null;
  let store = null;
  const match = {
    params: {
      id: 1231512,
    },
  };

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

  describe('When the component is rendered', () => {
    const functionsArray = [loadVideo, loadMovieDetail, loadMovieCast];
    const { params: { id } } = match;

    beforeEach(() => {
      wrapper = wrapperFactory();

      render(<Detail match={match} />, { wrapper });
    });
    test('Then should exist a link element with class back-to-home', () => {
      const linkElement = document.querySelector('.back-to-home');

      expect(linkElement).toBeInTheDocument();
    });

    functionsArray.forEach((functionToCall) => (
      test(`Then shoul call dispatch with ${functionToCall}`, () => {
        expect(loadVideo).toHaveBeenCalledWith(id);
      })));
  });

  describe('When the component has video loaded in state', () => {
    test('Then should render a div element with class name player-wrapper', () => {
      const initialState = {
        movieReducer: {
          movieDetail: {
            original_title: 'Title',
            release_date: '10-2-2015',
            vote_average: '50.5',
            genres: ['Terror', 'Suspense'],
          },
          cast: {
            cast: [{
              name: 'Akash Sapkota',
            }],
          },
          loading: false,
          video: '5qap5aO4i9A',
        },
      };

      wrapper = wrapperFactory(initialState);

      render(<Detail match={match} />, { wrapper });

      const videoElement = document.querySelector('.player-wrapper');

      expect(videoElement).toBeInTheDocument();
    });
  });
});
