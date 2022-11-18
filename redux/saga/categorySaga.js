import { takeLatest, take, put } from "redux-saga/effects";

import {
  FETCHING_CATEGORY_REQUEST_SAGA,
  FETCH_STORES_REQUEST_SAGA,
  FETCHING_CATEGORY_REQUEST_SAGA_AFTER_CHECK
} from "../types";
import { fetchFunctionSaga } from "../actions/categoryActions";

export function* categoryFetchSaga() {
  while (true) {
    const action = yield take(FETCHING_CATEGORY_REQUEST_SAGA);

    if (
      action.payload.navCategory &&
      action.payload.navCategory.URL &&
      action.payload.navCategory.URL.includes("stores")
    ) {
      yield put({
        type: FETCH_STORES_REQUEST_SAGA,
        payload: action.payload
      });
    } else {
      yield put({
        type: FETCHING_CATEGORY_REQUEST_SAGA_AFTER_CHECK,
        payload: action.payload
      });
    }
  }
}

export function* categoryFetchSagaAfterCheck() {
  yield takeLatest(
    FETCHING_CATEGORY_REQUEST_SAGA_AFTER_CHECK,
    fetchFunctionSaga
  );
}
