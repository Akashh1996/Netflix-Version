import userReducer from './userReducer';
import actionTypes from '../actions/actionTypes';

describe('Given userReducer function', () => {
  let newState = null;

  afterEach(() => {
    newState = null;
  });

  describe('When state is undefined', () => {
    test('Then should return an empty object', () => {
      newState = userReducer(undefined, true);

      expect(newState).toEqual({
        isLogged: false,
      });
    });
  });

  describe(`When action type is ${actionTypes.LOGIN_USER}`, () => {
    test('Then return an object with user data', () => {
      const initialState = {};
      const action = {
        type: actionTypes.LOGIN_USER,
      };

      newState = userReducer(initialState, action);

      expect(newState).toEqual({ ...initialState, user: action.user });
    });
  });

  describe(`When action type is ${actionTypes.AUTH_LOGOUT}`, () => {
    test('Then should make the user state null', () => {
      const initialState = {
        user: {
          displayName: 'akash',
        },
      };

      const action = {
        type: actionTypes.AUTH_LOGOUT,
      };

      newState = userReducer(initialState, action);

      expect(newState).toEqual({ ...initialState });
    });
  });
});
