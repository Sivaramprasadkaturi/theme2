import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import combinedReducers from "./redux/reducers";

import rootSaga from "./redux/saga/index";

let initialState = {};
let store = null;

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload // apply delta from hydration
    };

    return nextState;
  } else {
    const combinedReducer = combinedReducers(state, action);
    return combinedReducer;
  }
};

const initStore = (preloadedState = initialState) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    preloadedState,
    bindMiddleware([thunkMiddleware, sagaMiddleware])
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const initializeStore = preloadedState => {
  let _store = store ?? initStore(preloadedState);
  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState
    });

    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

/* export function useStore(initialState) {
  const store = initializeStore(initialState);
  console.log("store 44", store);
  return store;
} */

export const getStore = () => store;

export const wrapper = createWrapper(initializeStore, {
  debug: false /* process && process.env.NODE_ENV === "development" */ // no need to debug it anymore as it's running in the browser only now
});
