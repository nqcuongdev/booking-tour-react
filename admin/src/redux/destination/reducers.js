import { GET_ALL_TOUR_ATTRIBUTE_FAILED } from '../tour/constants';
import { GET_ALL_DESTINATION, GET_ALL_DESTINATION_SUCCESS } from './constants';

const INIT_STATE = {
    destinations: null,
    loading: false,
};

const Destination = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_DESTINATION:
            return { ...state, loading: true };
        case GET_ALL_DESTINATION_SUCCESS:
            return { ...state, destinations: action.payload, loading: false, error: null };
        case GET_ALL_TOUR_ATTRIBUTE_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Destination;
