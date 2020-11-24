import React, { useState } from 'react';
import { Map } from 'react-feather';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const GoogleMapAutoComplete = () => {
    const [address, setAddress] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

    const handleChange = (address) => {
        setAddress(address);
    };

    const handleSelect = (address) => {
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => console.log('Success', latLng))
            .catch((error) => console.error('Error', error));
    };

    return (
        <React.Fragment>
            <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'form-control',
                            })}
                        />
                        <div className="autocomplete-dropdown-container mt-3">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active mb-3'
                                    : 'suggestion-item mb-3';
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                console.log(suggestion);
                                return (
                                    <div
                                        key={suggestion.placeId}
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}>
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            {/* <div className="google-map mt-5" style={{ height: '372px', width: '100%' }}>
                <Map />
            </div> */}
        </React.Fragment>
    );
};

export default GoogleMapAutoComplete;
