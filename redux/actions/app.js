import { SET_AUTH_MODAL, SET_FIRST_LOADING, SET_LAST_PATH } from "../types/app";

export const setFirstLoading = () => dispatch => {
  dispatch({ type: SET_FIRST_LOADING });
};
export const setLastPath = path => dispatch => {
  dispatch({ type: SET_LAST_PATH, payload: path });
};
export const setAuthModal = payload => dispatch => {
  dispatch({ type: SET_AUTH_MODAL, payload: payload });
};
