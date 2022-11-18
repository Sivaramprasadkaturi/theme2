import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  UPDATE_LOGIN,
  USER_DATA_SUCCESS,
  COOKIE_WINDOW_SHOW,
  USER_DATA_INITIAL,
  LOGOUT_REQUEST
} from "../types.js";

import {
  LOGOUT_LINK,
  LOGIN_CHECK_LINK,
  CATEGORY_FETCH_LINK
} from "../links.js";

import { geolocationRequestAction } from "./handlersAction";

export const cookieWindowShow = payload => ({
  type: COOKIE_WINDOW_SHOW,
  payload: payload
});

export const loginSuccess = json => ({
  type: LOGIN_SUCCESS,
  payload: {
    loginName: json.loginname,
    firstName: json.firstname,
    lastName: json.lastname,
    securityToken: json.securitytoken,
    lat: json.latitude,
    lng: json.longitude
  }
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const logoutFailure = error => ({
  type: LOGOUT_FAILURE,
  payload: error
});

export const updateLoginInfo = json => ({
  type: UPDATE_LOGIN,
  payload: {
    loginName: json.loginname,
    firstName: json.firstname,
    lastName: json.lastname,
    securityToken: json.securitytoken,
    lat: json.latitude,
    lng: json.longitude,
    clientId: json.clientId,
    token: json.token
  }
});

export const fetchLogin = securitytoken => {
  var form = new FormData();
  form.append("securitytoken", securitytoken);

  return dispatch => {
    fetch(LOGIN_CHECK_LINK, {
      headers: {
        Accept: "*/*"
      }
    })
      .then(res => res.json())
      .then(json => {
        dispatch(loginSuccess(json.__Result));
      })
      .catch(error => dispatch(loginFailure(error)));
  };
};

export const loginUserDataSuccess = data => ({
  type: USER_DATA_SUCCESS,
  payload: data
});

export const loginUserDataInitial = data => ({
  type: USER_DATA_INITIAL,
  payload: data
});

export const fetchUserData = (securitytoken, langCode) => {
  var form = new FormData();
  form.append("securitytoken", securitytoken);
  return dispatch => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      dispatch(geolocationRequestAction(true));
    }
  };
};

export const handleLogout = securitytoken => {
  return dispatch => {
    var form = new FormData();
    form.append("securitytoken", securitytoken);
    dispatch({ type: LOGOUT_REQUEST });
    fetch(LOGOUT_LINK, {
      method: "POST",
      body: form,
      headers: {
        Accept: "*/*",
        credentials: "same-origin"
      },
      mimeType: "multipart/form-data",
      data: form
    })
      .then(json => {
        dispatch(logoutSuccess());
      })
      .catch(err => {
        dispatch(logoutFailure(err));
      });
  };
};
