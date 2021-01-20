import {
    CREATE_FACILITY,
    CREATE_FACILITY_SUCCESS,
    GET_ALL_FACILITY,
    GET_ALL_FACILITY_SUCCESS,
    GET_ALL_HOTEL,
    GET_ALL_HOTEL_SUCCESS,
    GET_ALL_TYPE,
    GET_ALL_TYPE_SUCCESS,
    HOTEL_ERROR,
} from './constants';

const INIT_STATE = {
    hotels: null,
    hotel: null,
    loading: false,
    attributes: null,
    facility: null,
    facilities: null,
};

const Hotel = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_HOTEL || GET_ALL_TYPE || GET_ALL_FACILITY:
            return { ...state, loading: true };
        case GET_ALL_HOTEL_SUCCESS:
            return { ...state, hotels: action.payload, hotel: null };
        case GET_ALL_TYPE_SUCCESS:
            return { ...state, types: action.payload, hotel: null };
        case CREATE_FACILITY_SUCCESS:
            return { ...state, facility: action.payload, loading: false, error: null };
        case GET_ALL_FACILITY_SUCCESS:
            return { ...state, facilities: action.payload, loading: false, error: null };
        case HOTEL_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Hotel;
