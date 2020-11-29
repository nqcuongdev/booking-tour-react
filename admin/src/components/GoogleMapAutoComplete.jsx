import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Label } from 'reactstrap';
import Map from '../components/Map';

const GoogleMapAutoComplete = (props) => {
    const [lat, setLat] = useState(props.lat ? props.lat : 15.9750106);
    const [lng, setLng] = useState(props.lng ? props.lng : 108.2510487);

    const handleSelect = (address) => {
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                setLat(latLng.lat);
                setLng(latLng.lng);
            })
            .catch((error) => console.error('Error', error));
    };

    return (
        <React.Fragment>
            {console.log(props.address)}
            <PlacesAutocomplete
                value={props.address}
                onChange={props.handleAddressChange}
                onSelect={props.handleSelectAddress}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'form-control',
                            })}
                            id={props.id}
                            name={props.name}
                            value={props.address}
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
            <div className="google-map" style={{ height: '372px', width: '100%' }}>
                <Label>Maps</Label>
                <Map lat={lat} lng={lng} />
            </div>
        </React.Fragment>
    );
};

export default GoogleMapAutoComplete;
