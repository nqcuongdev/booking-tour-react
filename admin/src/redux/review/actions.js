import {
    DELETE_REVIEW,
    DELETE_REVIEW_SUCCESS,
    GET_LIST_REVIEWS,
    GET_LIST_REVIEWS_SUCCESS,
    REVIEW_FAILED,
} from './constants';

export const getListReviews = () => ({
    type: GET_LIST_REVIEWS,
});

export const getListReviewsSuccess = (reviews) => ({
    type: GET_LIST_REVIEWS_SUCCESS,
    payload: reviews,
});

export const deleteReview = (id) => ({
    type: DELETE_REVIEW,
    payload: id,
});

export const deleteReviewSuccess = () => ({
    type: DELETE_REVIEW_SUCCESS,
});

export const reviewFailed = (error) => ({
    type: REVIEW_FAILED,
    payload: error,
});
