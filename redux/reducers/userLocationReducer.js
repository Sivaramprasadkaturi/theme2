import {
  SET_USER_LOCATION,
  USER_DATA_INITIAL,
  USER_DATA_SUCCESS,
  GET_GEOLOCATION_COOKIE_SUCCESS,
  SET_USER_LOCATION_NOT_INITIAL
} from "../types.js";

const initialState = {
  lat: "",
  lng: "",
  city: "",
  postal: "",
  state: "",
  country: "",
  initialState: true
};

const handleSetUserLocation = (state, payload) => {
  return {
    lat: payload.latitude || payload.lat,
    lng: payload.longitude || payload.lng || payload.long,
    city: payload.city,
    postal: payload.postal,
    state: payload.regioncode || payload.state,
    country: payload.countryname || payload.country
  };
};

const userLocationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_LOCATION_NOT_INITIAL:
      return {
        ...state,
        initialState: false
      };
    case USER_DATA_INITIAL:
      return handleSetUserLocation(state, payload);
    case USER_DATA_SUCCESS:
      return handleSetUserLocation(state, payload);
    case GET_GEOLOCATION_COOKIE_SUCCESS:
      return handleSetUserLocation(state, payload);
    default:
      return state;
  }
};

export default userLocationReducer;
