import { combineReducers } from "redux";
import app from "./app";
import menuReducer from "./menuReducer.js";
import categoryReducer from "./categoryReducer";
import facetReducer from "./facetReducer";
import product from "./product";
import loginReducer from "./loginReducer";
import geoLocationReducer from "./geoLocationReducer";
import userLocationReducer from "./userLocationReducer";
import handlersReducer from "./handlersReducer";
import mainReducer from "./mainReducer";
import unitsReducer from "./unitsReducer";
import sessionReducer from "./sessionReducer";
import compareListReducer from "./compareListReducer";
import wishListReducer from "./wishlistReducer";
import collectionsReducer from "./collectionsReducer";
import storeReducer from "./storeReducer";
import recentlyViewedItemsReducer from "./recentlyViewedItemsReducer";
import chatReducer from "./chatReducer";

export default combineReducers({
  appReducer: app,
  menuReducer,
  mainReducer,
  unitsReducer,
  categoryReducer,
  facetReducer,
  productReducer: product,
  sessionReducer,
  loginReducer,
  recentlyViewedItemsReducer,
  compareListReducer,
  geoLocationReducer,
  userLocationReducer,
  handlersReducer,
  wishListReducer,
  collectionsReducer,
  storeReducer,
  chatReducer
});
