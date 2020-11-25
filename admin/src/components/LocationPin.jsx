import React from 'react';
import * as FeatherIcon from 'react-feather';

const LocationPin = () => {
    return (
        <div className="pin">
            <FeatherIcon.MapPin size={40} color={'orange'} />
        </div>
    );
};

export default LocationPin;
