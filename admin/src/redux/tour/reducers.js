import {
    CREATE_TOUR_CATEGORY,
    CREATE_TOUR_CATEGORY_SUCCESS,
    CREATE_TOUR_CATEGORY_FAILED,
    GET_ALL_TOUR_CATEGORY,
    GET_ALL_TOUR_CATEGORY_SUCCESS,
    GET_ALL_TOUR_CATEGORY_FAILED,
    UPDATE_TOUR_CATEGORY,
    UPDATE_TOUR_CATEGORY_SUCCESS,
    UPDATE_TOUR_CATEGORY_FAILED,
} from './constants';

const INIT_STATE = {
    categories: null,
    category: null,
    loading: false,
};

const Tour = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_TOUR_CATEGORY:
            return { ...state, loading: true };
        case GET_ALL_TOUR_CATEGORY_SUCCESS:
            return { ...state, category: null, categories: action.payload, loading: false, error: null };
        case GET_ALL_TOUR_CATEGORY_FAILED:
            return { ...state, error: action.payload, loading: false };
        case CREATE_TOUR_CATEGORY:
            return { ...state, loading: true };
        case CREATE_TOUR_CATEGORY_SUCCESS:
            return { ...state, category: action.payload, loading: false, error: null };
        case CREATE_TOUR_CATEGORY_FAILED:
            return { ...state, error: action.payload, loading: false };
        case UPDATE_TOUR_CATEGORY:
            return { ...state, loading: true };
        case UPDATE_TOUR_CATEGORY_SUCCESS:
            return { ...state, category: action.payload, loading: false, error: null };
        case UPDATE_TOUR_CATEGORY_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Tour;
