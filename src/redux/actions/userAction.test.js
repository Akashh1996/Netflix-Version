/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios';
import * as firebase from 'firebase';
import '../../Firebase/firebaseIndex';

import {
  signInWithGoogle, signOut,
} from './userAction';
import actionTypes from './actionTypes';

jest.mock('axios');

describe('Given userAction', () => {
  let dispatch = null;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  afterEach(() => {
    dispatch.mockClear();
    axios.get.mockClear();
  });

  describe('When signInWithGoogle is called', () => {
    describe('And the addScope method responds with an object ', () => {
      test(`Then should call dispatch with an object with action type ${actionTypes.LOGIN_USER} and an object of userData`, async () => {
        jest.spyOn(firebase, 'auth').mockImplementation(() => ({
          signInWithPopup: jest.fn().mockImplementation(() => Promise.resolve({
            additionalUserInfo: {
              profile: {
                displayName: 'akash',
              },
            },
          })),
        }));

        firebase.auth.GoogleAuthProvider = jest
          .fn()
          .mockReturnValue({ addScope: jest.fn() });

        const expectedAction = {
          type: actionTypes.LOGIN_USER,
          user: {
            displayName: 'akash',
          },
        };

        await signInWithGoogle()(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);
      });
    });

    describe('And addscope get method respond with an error', () => {
      test(`Then should call dispatch with an object with action type ${actionTypes.LOGIN_USER_ERROR} and the error`, async () => {
        jest.spyOn(firebase, 'auth').mockImplementation(() => ({
          signInWithPopup: jest.fn().mockImplementation(() => Promise.reject('error')),
        }));

        firebase.auth.GoogleAuthProvider = jest
          .fn()
          .mockReturnValue({ addScope: jest.fn() });

        const expectedAction = { type: actionTypes.LOGIN_USER_ERROR, error: 'error' };

        await signInWithGoogle()(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);
      });
    });
  });

  describe('When signOut is called', () => {
    test('Then should call dispatch the correct action when user logs out', async () => {
      jest.spyOn(firebase, 'auth').mockImplementation(() => ({
        signOut: jest.fn().mockImplementation(() => Promise.resolve()),
      }));
      const expectedAction = {
        type: actionTypes.AUTH_LOGOUT,
      };

      await signOut()(dispatch);

      expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);
    });

    test('Then should call dispatch the correct action when there is error in signout', async () => {
      jest.spyOn(firebase, 'auth').mockImplementation(() => ({
        signOut: jest.fn().mockImplementation(() => Promise.reject('error')),
      }));
      const expectedAction = {
        type: actionTypes.AUTH_LOGOUT_ERROR,
        error: 'error',
      };

      await signOut()(dispatch);

      expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);
    });
  });
});
