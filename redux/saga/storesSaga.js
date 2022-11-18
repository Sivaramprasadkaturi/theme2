import { takeLatest } from "redux-saga/effects";

import { FETCH_STORES_REQUEST_SAGA } from "../types";
import { fetchStoresSaga } from "../actions/storesAction";

export function* storesFetchSaga() {
  yield takeLatest(FETCH_STORES_REQUEST_SAGA, fetchStoresSaga);
}
