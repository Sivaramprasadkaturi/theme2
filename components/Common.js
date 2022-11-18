import { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import {
  setGeoLocationState,
  setUserLocationNotInitial
} from "../redux/actions/geoLocationActions.js";
import { fetchingMenuSuccess } from "../redux/actions/menuActions.js";
import { FETCH_BASKET } from "../redux/types.js";
import menuData from "../preBuildData/menu/menu.json";

const Common = () => {
  /*  const menuState = useSelector(
    state => state.menuReducer.navCats,
    shallowEqual
  ); */

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: FETCH_BASKET });

    /*   if (menuState === "") {
      dispatch(fetchingMenuSuccess(menuData));
    } */

    let geoLocationStorage = localStorage.getItem("userLocationGoogleAPI");
    if (!geoLocationStorage || geoLocationStorage.length < 10) {
      geoLocationStorage = localStorage.getItem("userLocation");
    }
    console.log("geoLocationStorage", geoLocationStorage);
    try {
      let geoLocationObj = JSON.parse(geoLocationStorage);
      geoLocationObj.initial = true;
      dispatch(setGeoLocationState(geoLocationObj));
    } catch (err) {
      dispatch(setUserLocationNotInitial());
      console.error("Error parsing userLocationGoogleAPI");
    }
  }, [dispatch]);

  return null;
};

export default Common;
