/* eslint-disable import/prefer-default-export */
/* eslint-disable no-debugger */
import '../../Firebase/firebaseIndex';
import firebase from 'firebase';
import actionTypes from './actionTypes';

function handleSignInSuccess(user) {
  return {
    type: actionTypes.LOGIN_USER,
    user,
  };
}
function handleSignInError(error) {
  return {
    type: actionTypes.LOGIN_USER_ERROR,
    error,
  };
}

export function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  return async (dispatch) => {
    try {
      const { additionalUserInfo: { profile } } = await firebase.auth().signInWithPopup(provider);
      debugger;
      dispatch(handleSignInSuccess(profile));
    } catch (error) {
      dispatch(handleSignInError(error));
    }
  };
}

function handleSignOutSuccess() {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
}

function handleSignOutError(error) {
  return {
    type: actionTypes.AUTH_LOGOUT_ERROR,
    error,
  };
}

export function signOut() {
  return async (dispatch) => {
    try {
      await firebase.auth().signOut();
      dispatch(handleSignOutSuccess());
    } catch (error) {
      dispatch(handleSignOutError(error));
    }
  };
}
