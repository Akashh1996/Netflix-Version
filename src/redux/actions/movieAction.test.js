import axios from 'axios';
import configureStore from '../configureStore';
import postAnswer, { deleteAnswer } from './answerAction';

import actionTypes from './actionTypes';

jest.mock('axios');

describe('Actions', () => {
  let store;
  beforeEach(() => {
    store = configureStore();
  });
  afterEach(() => {
    jest.resetAllMocks();
    store = null;
  });
});
