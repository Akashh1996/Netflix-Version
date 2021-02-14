/* eslint-disable import/prefer-default-export */
/* eslint-disable no-debugger */
import '../../Firebase/firebaseIndex';
import firebase from 'firebase';
import axios from 'axios';
import actionTypes from './actionTypes';

const serverUsersUrl = 'http://localhost:5000/user';

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

export function clearUser() {
  return {
    type: actionTypes.CLEAR_USER,
  };
}

export function signOut() {
  return async (dispatch) => {
    try {
      localStorage.removeItem('user');
      await firebase.auth().signOut();
      dispatch(handleSignOutSuccess());
      dispatch(clearUser());
    } catch (error) {
      dispatch(handleSignOutError(error));
    }
  };
}

export function addUserSuccess(user) {
  return {
    type: actionTypes.ADD_USER,
    user,
  };
}
export function addUserError(error) {
  return {
    type: actionTypes.ADD_USER_ERROR,
    error,
  };
}
export function addUser(userData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(serverUsersUrl, userData);
      localStorage.user = JSON.stringify({ user: { email: data.email } });
      dispatch(addUserSuccess(data));
    } catch (error) {
      dispatch(addUserError(error));
    }
  };
}
export function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  return async (dispatch) => {
    try {
      const { additionalUserInfo: { profile } } = await firebase.auth().signInWithPopup(provider);
      dispatch(handleSignInSuccess(profile));
      dispatch(addUser({
        displayName: profile.name,
        email: profile.email,
      }));
    } catch (error) {
      dispatch(handleSignInError(error));
    }
  };
}
function addFavouriteSuccess(userDB) {
  return {
    type: actionTypes.ADD_FAVOURITE,
    userDB,
  };
}

function getUserSuccess(getUserDB) {
  return {
    type: actionTypes.GET_USER,
    getUserDB,
  };
}

export function getUser(email) {
  return async (dispatch) => {
    try {
      const data = await axios.get(serverUsersUrl, {
        params: {
          email,
        },
      });
      dispatch(getUserSuccess(data.data));
    } catch ({ message }) {
      console.log(message);
    }
  };
}

export function addFav(movie) {
  return async (dispatch) => {
    try {
      const { data: { data } } = await axios.put(serverUsersUrl, movie);
      dispatch(addFavouriteSuccess(data));
    } catch ({ message }) {
      console.log(message);
    }
  };
}

function deleteFavSuccess(userDB) {
  return {
    type: actionTypes.DELETE_FAVOURITE,
    userDB,
  };
}

export function deleteFav(movie) {
  return async (dispatch) => {
    try {
      const { data: { data } } = await axios.patch(serverUsersUrl, movie);
      dispatch(deleteFavSuccess(data));
    } catch ({ message }) {
      console.log(message);
    }
  };
}
