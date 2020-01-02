import * as actionTypes from "./actionTypes";
import axios from "axios";
const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId
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
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
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
        const expirationDate = new Date(
          new Date().getTime() + user.data.expiresIn * 1000
        );
        localStorage.setItem("token", user.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(user.data.idToken, user.data.localId));
        dispatch(checkAuthTimeout(user.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error.message));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const authCheckState = () => {
  return async dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate < new Date()) {
        dispatch(logout());
      } else {
        const idToken = {
          idToken: token
        };
        try {
          const response = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDBcQRrRN4tXRmR9ZhLdp7KKse4H-Z9xmo",
            idToken
          );

          dispatch(authSuccess(token, response.data.users[0].localId));

          dispatch(
            checkAuthTimeout(
              (expirationDate.getTime() - new Date().getTime()) / 1000
            )
          );
        } catch (err) {
          dispatch(authFail(err.response.data));
        }
      }
    }
  };
};
