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

const initialState = {
  loginName: "",
  firstName: "",
  lastName: "",
  securityToken: "",
  token: "",
  loading: false,
  clientId: "",
  userData: [],
  userInfo: {
    default: true,
    countryCode: "ca",
    countryName: "Canada",
    city: "Barrie",
    lat: 40.6976701,
    lng: -74.2598696,
    regioncode: "ON",
    regionName: "Ontario"
  },
  cookieWindow: null
};

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_DATA_INITIAL:
      return {
        ...state,
        userInfo: {
          default: true,
          /* countryCode: payload.countrycode.toLowerCase(),
          countryName: payload.countryname,
          city: payload.city,
          lat: payload.latitude,
          lng: payload.longitude,
          regioncode: payload.regioncode,
          regionName: payload.regionname */
          ...payload
        }
      };
    case USER_DATA_SUCCESS:
      return {
        ...state,
        userInfo: {
          default: false,
          countryCode: payload.countrycode.toLowerCase(),
          countryName: payload.countryname,
          city: payload.city,
          lat: payload.latitude,
          lng: payload.longitude,
          regioncode: payload.regioncode,
          regionName: payload.regionname
        }
      };
    case UPDATE_LOGIN:
      console.log("LOGIN UPDATE_LOGIN", payload);
      return {
        ...state,
        loginName: payload.loginName ? payload.loginName : "",
        firstName: payload.firstName ? payload.firstName : "",
        lastName: payload.lastName ? payload.lastName : "",
        securityToken: payload.securityToken ? payload.securityToken : "",
        clientId: payload.clientId ? payload.clientId : "",
        token: payload.token,
        userInfo: {
          ...state.userInfo,
          lat: payload.lat ? payload.lat : state.userInfo.lat,
          lng: payload.lng ? payload.lng : state.userInfo.lng
        }
      };
    case LOGIN_FAILURE:
      return { ...state, errorMessageLogin: payload };
    case LOGIN_SUCCESS:
      console.error("LOGIN SUCCESS", payload);
      return {
        ...state,
        loginName: payload.loginName ? payload.loginName : "",
        firstName: payload.firstName ? payload.firstName : "",
        lastName: payload.lastName ? payload.lastName : "",
        securityToken: payload.securityToken ? payload.securityToken : "",
        clientId: payload.clientId ? payload.clientId : "",
        userInfo: {
          ...state.userInfo,
          lat: payload.lat ? payload.lat : state.userInfo.lat,
          lng: payload.lng ? payload.lng : state.userInfo.lng
        }
      };
    case LOGOUT_REQUEST: {
      return { ...state, loading: true };
    }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loginName: "",
        firstName: "",
        lastName: "",
        securityToken: "",
        clientId: "",
        loading: false
      };

    case COOKIE_WINDOW_SHOW:
      return {
        ...state,
        cookieWindow: payload
      };
    case LOGOUT_FAILURE:
      return { ...state, errorMessageLogout: payload, loading: false };
    default:
      return state;
  }
};

export default loginReducer;
