import * as actionTypes from "./actionTypes";
import axios from "axios";
const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  };
};
const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const initComponent = () => {
  return {
    type: actionTypes.INIT_COMPONENT
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => dispatch(logout()), expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const userData = {
      email,
      password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDBcQRrRN4tXRmR9ZhLdp7KKse4H-Z9xmo";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBcQRrRN4tXRmR9ZhLdp7KKse4H-Z9xmo";
    }
    axios
      .post(url, userData)
      .then(user => {
        dispatch(authSuccess(user.data));
        dispatch(checkAuthTimeout(user.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error.message));
      });
  };
};
