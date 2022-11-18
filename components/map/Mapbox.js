import { useState } from "react";
import ReactMapGL from "react-map-gl";
import MarkerMap from "./MarkerMap";
import { shallowEqual, useSelector } from "react-redux";

export default function Mapbox({ stores }) {
  console.log("stores44", stores);
  const userLocationState = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );

  const [viewport, setViewport] = useState({
    longitude: userLocationState.lng ? userLocationState.lng : -79.7078,
    latitude: userLocationState.lat ? userLocationState.lat : 44.41,
    zoom: 7
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="400px"
      mapStyle={"mapbox://styles/mapbox/streets-v11"}
      mapboxApiAccessToken={
        "pk.eyJ1IjoicmFtaXN3ZXlyaSIsImEiOiJja3VmazZqZTUxczg1MndteHh4eDJybHpwIn0.pux5vhpZHMCTwGtpXeSQmg"
      }
      onViewportChange={setViewport}
      onLoad={event => {
        const mapboxLinks = document.querySelectorAll(
          ".mapboxgl-ctrl-attrib-inner a"
        );
        if (mapboxLinks) {
          mapboxLinks.forEach(link =>
            link.setAttribute("rel", "noopener nofollow")
          );
        }
      }}
    >
      {stores?.length > 0
        ? stores?.map(store => <MarkerMap key={store.code} store={store} />)
        : ""}
    </ReactMapGL>
  );
}
