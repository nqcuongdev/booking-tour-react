import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "../LocationPin/LocationPin";

const Maps = (props) => {
  const [location, setLocation] = useState({
    center: {
      lat: 15.9750157,
      lng: 108.2510487,
    },
    zoom: 17,
  });
  useEffect(() => {
    if (props.lat) {
      let center = {
        lat: props.lat,
        lng: props.lng,
      };
      setLocation({ center: center, zoom: props.zoom });
    }
  }, [props.lat]);
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
      center={location.center}
      zoom={location.zoom}
      // defaultCenter={props.center}
      // defaultZoom={props.zoom}
    >
      <LocationPin />
    </GoogleMapReact>
  );
};

export default Maps;
