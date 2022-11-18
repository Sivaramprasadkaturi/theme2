// import { categoryFetchSaga, categoryFetchSagaAfterCheck } from "./categorySaga";
import { productFetchSaga, productModalFetchSaga } from "./productSaga";
// import { storesFetchSaga } from "./storesSaga";
import {
  basketFetchSaga,
  basketFetchAfterAddedSaga,
  basketFetchAfterBasketUpdate
} from "./basketSaga";
import { spawn } from "redux-saga/effects";

// single entry point to start all Sagas at once
export default function* rootSaga() {
  // yield spawn(categoryFetchSaga);
  // yield spawn(categoryFetchSagaAfterCheck);
  yield spawn(productFetchSaga);
  // yield spawn(productModalFetchSaga);
  // yield spawn(storesFetchSaga);
  yield spawn(basketFetchSaga);
  yield spawn(basketFetchAfterAddedSaga);
  yield spawn(basketFetchAfterBasketUpdate);
}
