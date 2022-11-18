import {
  GET_GEOLOCATION_COOKIE_REQUEST,
  GET_GEOLOCATION_COOKIE_SUCCESS,
  GET_GEOLOCATION_COOKIE_FAILURE,
  CHANGE_GEOLOCATION,
  UPDATE_BRANDS_GEOLOCATION,
  UPDATE_USER_GEOLOCATION,
  SET_USER_LOCATION_NOT_INITIAL
} from "../types.js";

export const brandCompareUserGeoLocation = payload => ({
  type: UPDATE_USER_GEOLOCATION,
  payload: payload
});

export const changeGeoLocationAction = payload => ({
  type: CHANGE_GEOLOCATION,
  payload: payload
});

export const getGeolocationRequest = () => ({
  type: GET_GEOLOCATION_COOKIE_REQUEST
});

export const getGeoLocationSuccess = payload => ({
  type: GET_GEOLOCATION_COOKIE_SUCCESS,
  payload: payload
});

export const getGeoLocationFailute = err => ({
  type: GET_GEOLOCATION_COOKIE_FAILURE,
  paylaod: err
});

export const setUserLocationNotInitial = () => ({
  type: SET_USER_LOCATION_NOT_INITIAL
});

export const setGeoLocationState = geoLocation => {
  return dispatch => {
    dispatch(getGeolocationRequest());
    if (geoLocation) dispatch(getGeoLocationSuccess(geoLocation));
    else dispatch(getGeoLocationFailute("Could not get the geolocation."));
  };
};
