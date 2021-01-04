import {
    CREATE_TOUR_CATEGORY,
    CREATE_TOUR_CATEGORY_SUCCESS,
    GET_ALL_TOUR_CATEGORY,
    GET_ALL_TOUR_CATEGORY_SUCCESS,
    UPDATE_TOUR_CATEGORY,
    UPDATE_TOUR_CATEGORY_SUCCESS,
    CREATE_TOUR_ATTRIBUTE,
    CREATE_TOUR_ATTRIBUTE_SUCCESS,
    GET_ALL_TOUR_ATTRIBUTE,
    GET_ALL_TOUR_ATTRIBUTE_SUCCESS,
    UPDATE_TOUR_ATTRIBUTE,
    UPDATE_TOUR_ATTRIBUTE_SUCCESS,
    GET_ALL_TOUR,
    GET_ALL_TOUR_SUCCESS,
    CREATE_TOUR,
    CREATE_TOUR_SUCCESS,
    GET_TOUR,
    GET_TOUR_SUCCESS,
    UPDATE_TOUR,
    UPDATE_TOUR_SUCCESS,
    TOUR_HANDLE_FAILED,
    TOUR_SCHEDULE,
    TOUR_SCHEDULE_SUCCESS,
} from './constants';

const INIT_STATE = {
    categories: null,
    category: null,
    tours: null,
    tour: null,
    attributes: null,
    attribute: null,
    loading: false,
    schedule: null,
};

const Tour = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_TOUR:
            return { ...state, loading: true, tour: null };
        case GET_ALL_TOUR_SUCCESS:
            return { ...state, tours: action.payload, loading: false, error: null };
        case GET_TOUR:
            return { ...state, loading: true };
        case GET_TOUR_SUCCESS:
            return { ...state, tour: action.payload, loading: false, error: null };
        case CREATE_TOUR:
            return { ...state, loading: true };
        case CREATE_TOUR_SUCCESS:
            return { ...state, tour: action.payload, loading: false, error: null };
        case UPDATE_TOUR:
            return { ...state, loading: true };
        case UPDATE_TOUR_SUCCESS:
            return { ...state, tour: action.payload, loading: false, error: null };
        case GET_ALL_TOUR_CATEGORY:
            return { ...state, loading: true };
        case GET_ALL_TOUR_CATEGORY_SUCCESS:
            return { ...state, categories: action.payload, loading: false, error: null };
        case GET_ALL_TOUR_ATTRIBUTE:
            return { ...state, loading: true };
        case GET_ALL_TOUR_ATTRIBUTE_SUCCESS:
            return { ...state, attributes: action.payload, loading: false, error: null };
        case CREATE_TOUR_CATEGORY:
            return { ...state, loading: true };
        case CREATE_TOUR_CATEGORY_SUCCESS:
            return { ...state, category: action.payload, loading: false, error: null };
        case CREATE_TOUR_ATTRIBUTE:
            return { ...state, loading: true };
        case CREATE_TOUR_ATTRIBUTE_SUCCESS:
            return { ...state, attribute: action.payload, loading: false, error: null };
        case UPDATE_TOUR_CATEGORY:
            return { ...state, loading: true };
        case UPDATE_TOUR_CATEGORY_SUCCESS:
            return { ...state, category: action.payload, loading: false, error: null };
        case UPDATE_TOUR_ATTRIBUTE:
            return { ...state, loading: true };
        case UPDATE_TOUR_ATTRIBUTE_SUCCESS:
            return { ...state, attribute: action.payload, loading: false, error: null };
        case TOUR_SCHEDULE:
            return { ...state, loading: true };
        case TOUR_SCHEDULE_SUCCESS:
            return { ...state, schedule: action.payload, loading: false, error: null };
        case TOUR_HANDLE_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Tour;
