import {
    GET_ALL_HOTEL,
    GET_ALL_HOTEL_SUCCESS,
    GET_ALL_TYPE,
    GET_ALL_TYPE_SUCCESS,
    GET_ATTRIBUTE_HOTEL,
    GET_ATTRIBUTE_HOTEL_SUCCESS,
    HOTEL_ERROR,
} from './constants';

const INIT_STATE = {
    hotels: null,
    hotel: null,
    loading: false,
    attributes: null,
};

const Hotel = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_HOTEL || GET_ALL_TYPE || GET_ATTRIBUTE_HOTEL:
            return { ...state, loading: true };
        case GET_ALL_HOTEL_SUCCESS:
            return { ...state, hotels: action.payload, hotel: null };
        case GET_ALL_TYPE_SUCCESS:
            return { ...state, types: action.payload, hotel: null };
        case GET_ATTRIBUTE_HOTEL_SUCCESS:
            return { ...state, attributes: action.payload, loading: false };
        case HOTEL_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Hotel;
