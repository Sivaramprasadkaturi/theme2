import { takeLatest } from "redux-saga/effects";

import { GET_ITEM_FETCH_REQUEST, GET_MODAL_ITEM_FETCH_REQUEST } from "../types";
import { fetchFunctionSaga, fetchModalProductAction } from "../actions/productActions";

export function* productFetchSaga() {
  yield takeLatest(GET_ITEM_FETCH_REQUEST, fetchFunctionSaga);
}
export function* productModalFetchSaga() {
  yield takeLatest(GET_MODAL_ITEM_FETCH_REQUEST, fetchModalProductAction);
}
