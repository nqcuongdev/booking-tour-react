import { DELETE_REVIEW, DELETE_REVIEW_SUCCESS, GET_LIST_REVIEWS, GET_LIST_REVIEWS_SUCCESS } from './constants';

const INIT_STATE = {
    reviews: null,
    loading: false,
    error: null,
};

const Review = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LIST_REVIEWS || DELETE_REVIEW:
            return { ...state, loading: true };
        case GET_LIST_REVIEWS_SUCCESS:
            return { ...state, reviews: action.payload, loading: false, error: null };
        case DELETE_REVIEW_SUCCESS:
            return { ...state, loading: false, error: null };
        default:
            return { ...state };
    }
};

export default Review;
