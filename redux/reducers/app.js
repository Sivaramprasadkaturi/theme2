import { SET_FIRST_LOADING, SET_LAST_PATH, SET_AUTH_MODAL } from "../types/app";

const initialState = {
  firstLoading: true,
  lastPath: "/",
  authModal: false
};

export default function app(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_FIRST_LOADING:
      return {
        ...state,
        firstLoading: false
      };
    case SET_LAST_PATH:
      return {
        ...state,
        lastPath: payload,
        firstLoading: false
      };
    case SET_AUTH_MODAL:
      return {
        ...state,
        authModal: payload
      };
    default:
      return state;
  }
}
