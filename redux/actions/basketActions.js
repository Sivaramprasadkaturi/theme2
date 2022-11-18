import {
  FETCH_BASKET_SUCCESS,
  SET_BASKET_LOADING_AFTER_UPDATE,
  REQUEST_BASKET_AFTER_BASKET_UPDATE,
  SET_SUPPLIER_BASKET
} from "../types.js";
import { BASKET_LINK, BASKET_LINK_TEMP } from "../links.js";
import { call, put } from "redux-saga/effects";
import { getStore } from "../../store.js";

export const fetchBasketAction = products => ({
  type: FETCH_BASKET_SUCCESS,
  payload: products
});

export const setBasketLoadingAfterUpdate = payload => ({
  type: SET_BASKET_LOADING_AFTER_UPDATE,
  payload
});
export const setSupplierBasket = products => ({
  type: SET_SUPPLIER_BASKET,
  payload: products
});

const api = async params => {
  console.log("params", params);
  try {
    const res = await fetch(
      BASKET_LINK.replace("$LANGUAGE", params.language || "en")
    );
    const json = await res.json();
    let basket = json.__Result;
    return basket;
  } catch (error) {
    console.warn("fetch basket_link failed", error);
  }
};

export function* fetchBasketSaga(action) {
  console.log("getStore", getStore().getState().mainReducer);
  let language = getStore().getState().mainReducer.lang;
  let currency = getStore().getState().mainReducer.currency;
  let params = { language, currency };
  try {
    const result = yield call(api, params);
    yield put(fetchBasketAction(result));
    if (action.type === REQUEST_BASKET_AFTER_BASKET_UPDATE) {
      yield put(setBasketLoadingAfterUpdate(false));
    }
  } catch (error) {
    console.error("fetch basket saga error", error);
    if (action.type === REQUEST_BASKET_AFTER_BASKET_UPDATE) {
      yield put(setBasketLoadingAfterUpdate(false));
    }
  }
}
