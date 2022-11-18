import { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setGeoLocationState } from "../../../redux/actions/geoLocationActions";
import { fetchUserData } from "../../../redux/actions/loginActions";
import classes from "./LocationModal.module.css";
import styled from "styled-components";
import { MdMyLocation } from "react-icons/md";
import Script from "next/script";

const Wrapper = styled.div`
  width: 400px;
  border: 1px solid #000;
  text-align: left;
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 999;
  background: #fff;
  box-shadow: 1px 1px 3px grey;
  padding: 20px;
  p {
    line-height: 1.5em;
    font-weight: 500;
  }
  input {
    color: rgb(51, 51, 51);
    height: 42px;
    margin: 15px 0 25px;
    text-indent: 1rem;
    font-size: 13px;
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-width: 1px;
    --tw-border-opacity: 1;
    border-color: rgba(229, 231, 235, var(--tw-border-opacity));
    width: 100%;
  }
  #address {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const GOOGLE_MAPS_API_KEY = "AIzaSyDLf2F_mKvNtzxcoNyTj1FT2s9zWIGVGyo";

const LocationModal = ({
  close,
  open,
  geoLocationScriptLoaded,
  setGeoLocationScriptLoaded,
  googleMapsScriptLoaded,
  setGoogleMapsScriptLoaded
}) => {
  const dispatch = useDispatch();

  const handleCancelButtonClicked = () => {
    close();
  };

  const handleGeoLocationConfirmClicked = () => {
    if (typeof window !== "undefined") {
      let location = window.confirmLocation();

      if (location) {
        location.initial = false;
        location.userInput = true;
        console.log({ location });

        dispatch(setGeoLocationState(location));
        /*   if (distanceState == null) {
        // set distance to smallest radius (75km)
        dispatch(setCategoryDistanceAction(0));
      } */
      }

      handleCancelButtonClicked();
    }
  };

  useEffect(() => {
    if (geoLocationScriptLoaded && googleMapsScriptLoaded) {
      console.log("autoComplete");
      window.initAutocomplete();
    }
  }, [geoLocationScriptLoaded, googleMapsScriptLoaded]);

  /*   const languageState = useSelector(
    state => state.mainReducer.lang,
    shallowEqual
  );
 */
  const handleAutoDetectLocationClicked = e => {
    console.log({ e });
    handleCancelButtonClicked();
    dispatch(fetchUserData("", "en" /* languageState */));
  };

  return (
    <Wrapper>
      <Script
        id="google-maps-script"
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`}
        onLoad={() => setGoogleMapsScriptLoaded(true)}
      ></Script>
      <Script
        src="/geoLocation.js"
        onLoad={() => setGeoLocationScriptLoaded(true)}
      ></Script>
      {/* <div id="getLocationDiv" className={classes.container}> */}
      {/* <div className="locationDivWrapper"> */}
      <div
        className="sl-btn sl-btn-confirm mb-6 w-full text-center"
        onClick={handleAutoDetectLocationClicked}
      >
        <span className="text-2xl">Auto-Detect Here</span>
      </div>
      <p className="mb-3">
        Please confirm your delivery location via auto-detect above or type in
        below street address or Postal/Zip.
      </p>
      <p className="">
        confirmations ensure best prices, sales and fastest cost effective
        shipping.
      </p>
      {/* <label>
          Click
          <span
            onClick={handleAutoDetectLocationClicked}
            style={{
              textDecoration: "underline",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            here
          </span>
          to allow your browser to auto-detect your location.
        </label>
        <label>
          Or enter either your street address or your ZIP / Postal Code.
        </label> */}
      <form action="" className=" my-6 ">
        <div className="flex items-center input-group">
          <div
            onClick={handleAutoDetectLocationClicked}
            className="sl-btn sl-btn-confirm h-full flex items-center justify-center"
            style={{ height: 42 }}
          >
            <MdMyLocation className="text-2xl" />
          </div>

          <input
            /* onFocus={window.geolocate} */
            id="autocompleteGoogle"
            type="search"
            placeholder="Type your address"
            autoComplete="off"
            style={{ marginTop: 0, marginBottom: 0 }}
          />
        </div>
      </form>
      <table id="address">
        <tbody>
          <tr>
            <td className="autocLabel">Street Address</td>
            <td className="slimField">
              <input className="field" id="street_number" disabled={true} />
            </td>
            <td className="wideField" colSpan="2">
              <input className="field" id="route" disabled={true} />
            </td>
          </tr>
          <tr>
            <td className="autocLabel">City</td>
            <td className="wideField" colSpan="3">
              <input className="field" id="locality" disabled={true} />
            </td>
          </tr>
          <tr>
            <td className="autocLabel">State/Prov</td>
            <td className="slimField">
              <input
                className="field"
                id="administrative_area_level_1"
                disabled={true}
              />
            </td>
            <td
              className="autocLabel"
              style={{
                marginLeft: "10px"
              }}
            >
              ZIP/Postal
            </td>
            <td className="wideField">
              <input className="field" id="postal_code" disabled={true} />
              <input
                className="field"
                id="postal_code_prefix"
                disabled={true}
              />
            </td>
          </tr>
          <tr>
            <td className="autocLabel">Country</td>
            <td className="wideField" colSpan="3">
              <input className="field" id="country" disabled={true} />
            </td>
          </tr>
        </tbody>
      </table>
      <div
        className="sl-btn sl-btn-confirm"
        onClick={handleGeoLocationConfirmClicked}
      >
        <span>Confirm</span>
      </div>
      <div
        className="sl-btn sl-btn-cancel"
        style={{
          marginLeft: "15px"
        }}
        onClick={handleCancelButtonClicked}
      >
        <span>Cancel</span>
      </div>
      {/* </div> */}
    </Wrapper>
  );
};

export default LocationModal;
