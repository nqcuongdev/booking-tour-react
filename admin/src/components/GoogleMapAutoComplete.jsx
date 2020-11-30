import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Label } from 'reactstrap';
import Map from '../components/Map';

const GoogleMapAutoComplete = ({ onUpdateAddress, onUpdateLatLng }) => {
    const [lat, setLat] = useState(15.9750106);
    const [lng, setLng] = useState(108.2510487);
    const [address, setAddress] = useState('');

    const handleAddress = (address) => {
        setAddress(address);
    };

    const handleSelect = (address) => {
        // Pass address to parent component
        onUpdateAddress(address);

        //Show address in label
        setAddress(address);

        //Get lat lng by address
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                //Pass lat lng to parent component
                onUpdateLatLng(latLng.lat, latLng.lng);
                setLat(latLng.lat);
                setLng(latLng.lng);
            })
            .catch((error) => console.error('Error', error));
    };

    // Log error status and clear dropdown when Google Maps API returns an error.
    const onError = (status, clearSuggestions) => {
        console.log('Google Maps API returned error with status: ', status);
        clearSuggestions();
    };

    return (
        <React.Fragment>
            <PlacesAutocomplete value={address} onChange={handleAddress} onSelect={handleSelect} onError={onError}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'form-control',
                            })}
                            value={address}
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
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                        key={suggestion.placeId}>
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            <div className="google-map" style={{ height: '372px', width: '100%' }}>
                <Label>Maps</Label>
                <Map lat={lat} lng={lng} />
            </div>
        </React.Fragment>
    );
};

export default GoogleMapAutoComplete;
