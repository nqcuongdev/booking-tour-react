import {
    CREATE_TOUR,
    CREATE_TOUR_ATTRIBUTE,
    CREATE_TOUR_ATTRIBUTE_FAILED,
    CREATE_TOUR_ATTRIBUTE_SUCCESS,
    CREATE_TOUR_CATEGORY,
    CREATE_TOUR_CATEGORY_FAILED,
    CREATE_TOUR_CATEGORY_SUCCESS,
    CREATE_TOUR_FAILED,
    CREATE_TOUR_SUCCESS,
    GET_ALL_TOUR,
    GET_ALL_TOUR_ATTRIBUTE,
    GET_ALL_TOUR_ATTRIBUTE_FAILED,
    GET_ALL_TOUR_ATTRIBUTE_SUCCESS,
    GET_ALL_TOUR_CATEGORY,
    GET_ALL_TOUR_CATEGORY_FAILED,
    GET_ALL_TOUR_CATEGORY_SUCCESS,
    GET_ALL_TOUR_FAILED,
    GET_ALL_TOUR_SUCCESS,
    GET_TOUR,
    GET_TOUR_FAILED,
    GET_TOUR_SUCCESS,
    UPDATE_TOUR,
    UPDATE_TOUR_ATTRIBUTE,
    UPDATE_TOUR_ATTRIBUTE_FAILED,
    UPDATE_TOUR_ATTRIBUTE_SUCCESS,
    UPDATE_TOUR_CATEGORY,
    UPDATE_TOUR_CATEGORY_FAILED,
    UPDATE_TOUR_CATEGORY_SUCCESS,
    UPDATE_TOUR_FAILED,
    UPDATE_TOUR_SUCCESS,
} from './constants';

export const getAllTour = () => ({
    type: GET_ALL_TOUR,
});

export const getAllTourSuccess = (tours) => ({
    type: GET_ALL_TOUR_SUCCESS,
    payload: tours,
});

export const getAllTourFailed = (error) => ({
    type: GET_ALL_TOUR_FAILED,
    payload: error,
});

export const getTour = (_id) => ({
    type: GET_TOUR,
    payload: _id,
});

export const getTourSuccess = (tour) => ({
    type: GET_TOUR_SUCCESS,
    payload: tour,
});

export const getTourFailed = (error) => ({
    type: GET_TOUR_FAILED,
    payload: error,
});

export const createTour = (data) => ({
    type: CREATE_TOUR,
    payload: data,
});

export const createTourSuccess = (tour) => ({
    type: CREATE_TOUR_SUCCESS,
    payload: tour,
});

export const createTourFailed = (error) => ({
    type: CREATE_TOUR_FAILED,
    payload: error,
});

export const updateTour = (inputData) => ({
    type: UPDATE_TOUR,
    payload: inputData,
});

export const updateTourSuccess = (tour) => ({
    type: UPDATE_TOUR_SUCCESS,
    payload: tour,
});

export const updateTourFailed = (error) => ({
    type: UPDATE_TOUR_FAILED,
    payload: error,
});

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

export const getAllTourAttribute = () => ({
    type: GET_ALL_TOUR_ATTRIBUTE,
    payload: 'tour',
});

export const getAllTourAttributeSuccess = (attributes) => ({
    type: GET_ALL_TOUR_ATTRIBUTE_SUCCESS,
    payload: attributes,
});

export const getAllTourAttributeFailed = (error) => ({
    type: GET_ALL_TOUR_ATTRIBUTE_FAILED,
    payload: error,
});

export const createTourAttribute = (title, type) => ({
    type: CREATE_TOUR_ATTRIBUTE,
    payload: { title, type },
});

export const createTourAttributeSuccess = (attribute) => ({
    type: CREATE_TOUR_ATTRIBUTE_SUCCESS,
    payload: attribute,
});

export const createTourAttributeFailed = (error) => ({
    type: CREATE_TOUR_ATTRIBUTE_FAILED,
    payload: error,
});

export const updateTourAttribute = (_id, title, type, status) => ({
    type: UPDATE_TOUR_ATTRIBUTE,
    payload: { _id, title, type, status },
});

export const updateTourAttributeSuccess = (attribute) => ({
    type: UPDATE_TOUR_ATTRIBUTE_SUCCESS,
    payload: attribute,
});

export const updateTourAttributeFailed = (error) => ({
    type: UPDATE_TOUR_ATTRIBUTE_FAILED,
    payload: error,
});
