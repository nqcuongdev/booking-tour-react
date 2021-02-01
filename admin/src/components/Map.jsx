import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from './LocationPin';

const Map = (props) => {
    const center = {
        lat: props.lat,
        lng: props.lng,
    };

    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
            center={center}
            defaultZoom={17}>
            <LocationPin />
        </GoogleMapReact>
    );
};

export default Map;
