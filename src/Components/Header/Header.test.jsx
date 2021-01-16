import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Header from './Header';
import { loadBySearch } from '../../redux/actions/movieAction';

jest.mock('../../redux/actions/movieAction');

const buildStore = configureStore([thunk]);

describe('Given The Header Component', () => {
  beforeEach(() => {
    const dispatch = jest.fn();
    const initialState = {
      movieReducer: {},
      dispatch,
    };
    const store = buildStore(initialState);
    store.dispatch = jest.fn();

    const Wrapper = ({ children }) => (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
    render(<Header />, { wrapper: Wrapper });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('When there is a input value in the sarch bar', () => {
    test('Then the loadBySearch function should be dispatched', () => {
      const event = {
        preventDefault() {},
        target: {
          value: 'hellboy',
        },
      };
      const inputsElements = document.querySelector('#input_search');

      fireEvent.change(inputsElements, event);

      expect(loadBySearch).toHaveBeenCalled();
    });
  });
});
