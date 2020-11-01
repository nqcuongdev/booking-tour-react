import React from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "../LocationPin/LocationPin";

const Maps = (props) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyBMlbwEapFEGY-u7gmU46_xjCf8PZCeXzU" }}
      defaultCenter={props.center}
      defaultZoom={props.zoom}
    >
      <LocationPin />
    </GoogleMapReact>
  );
};

export default Maps;
