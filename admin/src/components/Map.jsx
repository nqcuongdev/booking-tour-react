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
            bootstrapURLKeys={{ key: 'AIzaSyBMlbwEapFEGY-u7gmU46_xjCf8PZCeXzU' }}
            center={center}
            defaultZoom={17}>
            <LocationPin />
        </GoogleMapReact>
    );
};

export default Map;
