import {
    CREATE_TOUR_CATEGORY,
    CREATE_TOUR_CATEGORY_FAILED,
    CREATE_TOUR_CATEGORY_SUCCESS,
    GET_ALL_TOUR_CATEGORY,
    GET_ALL_TOUR_CATEGORY_FAILED,
    GET_ALL_TOUR_CATEGORY_SUCCESS,
    UPDATE_TOUR_CATEGORY,
    UPDATE_TOUR_CATEGORY_FAILED,
    UPDATE_TOUR_CATEGORY_SUCCESS,
} from './constants';

export const getAllTourCategory = () => ({
    type: GET_ALL_TOUR_CATEGORY,
    payload: 'tour',
});

export const getAllTourCategorySuccess = (categories) => ({
    type: GET_ALL_TOUR_CATEGORY_SUCCESS,
    payload: categories,
});

export const getAllTourCategoryFailed = (error) => ({
    type: GET_ALL_TOUR_CATEGORY_FAILED,
    payload: error,
});

export const createTourCategory = (title, type) => ({
    type: CREATE_TOUR_CATEGORY,
    payload: { title, type },
});

export const createTourCategorySuccess = (category) => ({
    type: CREATE_TOUR_CATEGORY_SUCCESS,
    payload: category,
});

export const createTourCategoryFailed = (error) => ({
    type: CREATE_TOUR_CATEGORY_FAILED,
    payload: error,
});

export const updateTourCategory = (_id, title, type, status) => ({
    type: UPDATE_TOUR_CATEGORY,
    payload: { _id, title, type, status },
});

export const updateTourCategorySuccess = (category) => ({
    type: UPDATE_TOUR_CATEGORY_SUCCESS,
    payload: category,
});

export const updateTourCategoryFailed = (error) => ({
    type: UPDATE_TOUR_CATEGORY_FAILED,
    payload: error,
});
