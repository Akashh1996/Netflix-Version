import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../../redux/configureStore';
import Header from './Header';
import { loadBySearch } from '../../redux/actions/movieAction';

jest.mock('../../redux/actions/movieAction');

describe('Given The Header Component', () => {
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

  describe('When there is an input value in the search bar', () => {
    test('Then the loadBySearch function should be called', () => {
      const event = {
        preventDefault() {},
        target: {
          value: 'hellboy',
        },
      };

      wrapper = wrapperFactory();

      render(<Header />, { wrapper });

      const inputsElements = document.querySelector('#input_search');

      fireEvent.change(inputsElements, event);

      expect(loadBySearch).toHaveBeenCalled();
    });
  });

  describe('When window scrollY is > 10', () => {
    test('Then class nav__black should exist in the document', () => {
      wrapper = wrapperFactory();

      render(<Header />, { wrapper });

      fireEvent.scroll(window, { target: { scrollY: 100 } });

      const navElement = document.querySelector('.nav__black');

      expect(navElement).toBeInTheDocument();
    });
  });

  describe('When window scrollY is < 10', () => {
    test('Then class nav__black shouldn`t exist in the document', () => {
      wrapper = wrapperFactory();

      render(<Header />, { wrapper });

      fireEvent.scroll(window, { target: { scrollY: 5 } });

      const navElement = document.querySelector('.nav__black');

      expect(navElement).not.toBeInTheDocument();
    });
  });
});
