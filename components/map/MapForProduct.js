import * as React from "react";
import ReactMapGL from "react-map-gl";
import MarkerMap from "./MarkerMap";

export default function MapForProduct({ stores }) {
  const [viewport, setViewport] = React.useState({
    longitude: -79.347015,
    latitude: 43.651070,
    zoom: 13
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="80%"
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
        ? stores?.map((store,i) => <MarkerMap key={i} store={store} />)
        : ""}
    </ReactMapGL>
  );
}
