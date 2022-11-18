import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Modal from "../../AC-UI-Elements/Modal/Modal";
import LocationModal from "./LocationModal";
import GeolocationPermission from "./GeolocationPermission/GeolocationPermission";
import { toggleLocationBoxAction } from "../../../redux/actions/handlersAction.js";

const UserLocation = ({ onlyLocationInfo, color, fontSize = 12 }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  /*   const initialState = () =>
    window.localStorage.getItem("userGeolocation") || null;
  const [userGeolocation, setUserGeolocation] = useState(initialState); */

  const handleOpen = () => {
    setOpen(true);
    dispatch(toggleLocationBoxAction(true));
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(toggleLocationBoxAction(false));
  };

  const geoLocationState = useSelector(
    state => state.geoLocationReducer.geoLocation,
    shallowEqual
  );

  const geolocationRequestState = useSelector(
    state => state.handlersReducer.geolocationRequest,
    shallowEqual
  );

  const userLocationState = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );

  const locationBoxOpenState = useSelector(
    state => state.handlersReducer.locationBoxOpen,
    shallowEqual
  );

  const [geoLocationScriptLoaded, setGeoLocationScriptLoaded] = useState(false);
  const [googleMapsScriptLoaded, setGoogleMapsScriptLoaded] = useState(false);

  useEffect(() => {
    if (
      userLocationState.initialState === false &&
      !userLocationState.lat &&
      !userLocationState.lng
    ) {
      handleOpen();
    }
  }, [userLocationState.initialState]);

  useEffect(() => {
    if (locationBoxOpenState !== open) setOpen(locationBoxOpenState);
  }, [locationBoxOpenState, open]);

  useEffect(() => {
    if (
      (geoLocationState && geoLocationState.lat,
      geoLocationState.long && !geoLocationState.initial)
    ) {
      localStorage.setItem(
        "userLocationGoogleAPI",
        JSON.stringify(geoLocationState)
      );
      // If user entered value, store in seprate localStorage key so that we can go back to this value
      if (geoLocationState && geoLocationState.userInput) {
        localStorage.setItem(
          "userLocationUserInputBackup",
          JSON.stringify(geoLocationState)
        );
      }

      // dispatch(fetchCategoryFromDirectUrl());
    }
  }, [geoLocationState]);

  const renderGeolocation = () => {
    if (userLocationState.lat && userLocationState.lng) {
      const { city, state } = userLocationState;
      let location = `${city}, ${state}`;
      return location;
    }
    return "Unknown -";
  };
  return (
    <Wrapper className="locationText">
      {geolocationRequestState && <GeolocationPermission />}
      <div
        className="location_text"
        style={{
          display: "inline-block",
          padding: "5px 10px 5px 0px",
          fontSize: "13px",
          color: "#f7f7f7"
        }}
        onClick={handleOpen}
      >
        <span
          className="location_text"
          style={{
            cursor: "pointer",
            padding: "0px",
            display: "flex",
            alignItems: "center",
            color: "#f7f7f7"
          }}
        >
          {/* <i
            className="material-icons-new"
            style={{
              width: "24px",
              height: "24px",
              fontSize: "24px",
              textDecoration: "unset !important",
              background: `url(${PROJECT_LINK}/store/${VID}/assets/icons/${
                geoLocationState != ""
                  // ? "placeholder-point-confirmed.png"
                  ? "pin.svg"
                  : "placeholder-point.png"
              })`,
              marginRight: "5px"
            }}
          ></i> */}
          {/* <img src={`${PROJECT_LINK}/store/${VID}/assets/icons/pin.svg`} /> */}

          <p
            style={{
              // textDecoration: "underline",
              marginBottom: "0px",
              whiteSpace: "nowrap",
              color: color,
              fontSize: fontSize
            }}
          >
            {" "}
            Your Location: <span className="cxLoc">
              {renderGeolocation()}
            </span>{" "}
            <span
              style={{
                color: userLocationState.lat != "" ? "#2aa841" : "#eadb64"
              }}
              className="cxSelfLoc"
            >
              <u className="cxConfirm">
                {userLocationState.lat != ""
                  ? ` Confirmed Location`
                  : ` Please Confirm Location`}
              </u>
            </span>
          </p>
        </span>
      </div>
      {!onlyLocationInfo && (
        <Modal
          aria-labelledby="geolocation-modal"
          aria-describedby="google-geolocation-form"
          open={open}
          onClose={handleClose}
        >
          <div className="location-modal-wrapper">
            <LocationModal
              geoLocationScriptLoaded={geoLocationScriptLoaded}
              setGeoLocationScriptLoaded={setGeoLocationScriptLoaded}
              googleMapsScriptLoaded={googleMapsScriptLoaded}
              setGoogleMapsScriptLoaded={setGoogleMapsScriptLoaded}
              open={open}
              close={handleClose}
            />
          </div>
        </Modal>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  cursor: pointer;
  padding: 0px;
  display: flex;
  align-items: center;
  color: rgb(247, 247, 247);
  height: 100%;

  p {
    margin-bottom: 0px;
    color: var(--text-color);
  }
  .cxLoc {
  }
  .cxSelfLoc {
    color: var(--secondary-color);
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
    p {
      font-size: 12px !important;
    }
  }
`;

export default UserLocation;
