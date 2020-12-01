import {
    CREATE_DESTINATION,
    CREATE_DESTINATION_FAILED,
    CREATE_DESTINATION_SUCCESS,
    GET_ALL_DESTINATION,
    GET_ALL_DESTINATION_FAILED,
    GET_ALL_DESTINATION_SUCCESS,
    GET_DESTINATION,
    GET_DESTINATION_FAILED,
    GET_DESTINATION_SUCCESS,
} from './constants';

const INIT_STATE = {
    destinations: null,
    destination: null,
    loading: false,
};

const Destination = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_DESTINATION:
            return { ...state, loading: true };
        case GET_ALL_DESTINATION_SUCCESS:
            return { ...state, destinations: action.payload, destination: null, loading: false, error: null };
        case GET_ALL_DESTINATION_FAILED:
            return { ...state, error: action.payload, loading: false };
        case CREATE_DESTINATION:
            return { ...state, loading: true, destination: null };
        case CREATE_DESTINATION_SUCCESS:
            return { ...state, destination: action.payload, loading: false, error: null };
        case CREATE_DESTINATION_FAILED:
            return { ...state, error: action.payload, loading: false };
        case GET_DESTINATION: {
            return { ...state, loading: true };
        }
        case GET_DESTINATION_SUCCESS:
            return { ...state, destination: action.payload, loading: false, error: null };
        case GET_DESTINATION_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Destination;
