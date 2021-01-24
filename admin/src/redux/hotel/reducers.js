import {
    CREATE_FACILITY,
    CREATE_FACILITY_SUCCESS,
    CREATE_HOTEL,
    CREATE_HOTEL_SUCCESS,
    CREATE_ROOM,
    CREATE_ROOM_SUCCESS,
    GET_ALL_FACILITY,
    GET_ALL_FACILITY_SUCCESS,
    GET_ALL_HOTEL,
    GET_ALL_HOTEL_SUCCESS,
    GET_ALL_ROOM,
    GET_ALL_ROOM_SUCCESS,
    GET_ALL_TYPE,
    GET_ALL_TYPE_SUCCESS,
    GET_HOTEL,
    GET_HOTEL_SUCCESS,
    HOTEL_ERROR,
    UPDATE_FACILITY,
    UPDATE_FACILITY_SUCCESS,
    UPDATE_HOTEL_SUCCESS,
    UPDATE_ROOM,
    UPDATE_ROOM_SUCCESS,
} from './constants';

const INIT_STATE = {
    hotels: null,
    hotel: null,
    loading: false,
    attributes: null,
    facility: null,
    facilities: null,
    rooms: null,
    room: null,
};

const Hotel = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_HOTEL ||
            GET_ALL_TYPE ||
            GET_ALL_FACILITY ||
            CREATE_FACILITY ||
            UPDATE_FACILITY ||
            CREATE_HOTEL ||
            GET_HOTEL ||
            GET_ALL_ROOM ||
            CREATE_ROOM ||
            UPDATE_ROOM:
            return { ...state, loading: true };
        case GET_ALL_HOTEL_SUCCESS:
            return { ...state, hotels: action.payload, hotel: null };
        case GET_ALL_TYPE_SUCCESS:
            return { ...state, types: action.payload, hotel: null };
        case CREATE_FACILITY_SUCCESS:
            return { ...state, facility: action.payload, loading: false, error: null };
        case GET_ALL_FACILITY_SUCCESS:
            return { ...state, facilities: action.payload, loading: false, error: null };
        case CREATE_HOTEL_SUCCESS:
            return { ...state, hotel: action.payload, loading: false, error: null };
        case UPDATE_HOTEL_SUCCESS:
            return { ...state, hotel: action.payload, loading: false, error: null };
        case GET_HOTEL_SUCCESS:
            return { ...state, hotel: action.payload, loading: false, error: null };
        case UPDATE_FACILITY_SUCCESS:
            return { ...state, loading: false };
        case GET_ALL_ROOM_SUCCESS:
            return { ...state, rooms: action.payload, loading: false, error: null };
        case CREATE_ROOM_SUCCESS:
            return { ...state, loading: false, error: null };
        case UPDATE_ROOM_SUCCESS:
            return { ...state, loading: false, error: null };
        case HOTEL_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Hotel;
