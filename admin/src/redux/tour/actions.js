import {
    ADD_TOUR_SCHEDULE,
    ADD_TOUR_SCHEDULE_SUCCESS,
    CREATE_TOUR,
    CREATE_TOUR_ATTRIBUTE,
    CREATE_TOUR_ATTRIBUTE_SUCCESS,
    CREATE_TOUR_CATEGORY,
    CREATE_TOUR_CATEGORY_SUCCESS,
    CREATE_TOUR_SUCCESS,
    GET_ALL_TOUR,
    GET_ALL_TOUR_ATTRIBUTE,
    GET_ALL_TOUR_ATTRIBUTE_SUCCESS,
    GET_ALL_TOUR_CATEGORY,
    GET_ALL_TOUR_CATEGORY_SUCCESS,
    GET_ALL_TOUR_SUCCESS,
    GET_TOUR,
    GET_TOUR_SUCCESS,
    TOUR_HANDLE_FAILED,
    TOUR_SCHEDULE,
    TOUR_SCHEDULE_SUCCESS,
    UPDATE_TOUR,
    UPDATE_TOUR_ATTRIBUTE,
    UPDATE_TOUR_ATTRIBUTE_SUCCESS,
    UPDATE_TOUR_CATEGORY,
    UPDATE_TOUR_CATEGORY_SUCCESS,
    UPDATE_TOUR_SUCCESS,
    UPDATE_TOUR_SCHEDULE,
    UPDATE_TOUR_SCHEDULE_SUCCESS,
} from './constants';

export const getAllTour = () => ({
    type: GET_ALL_TOUR,
});

export const getAllTourSuccess = (tours) => ({
    type: GET_ALL_TOUR_SUCCESS,
    payload: tours,
});

export const getTour = (_id) => ({
    type: GET_TOUR,
    payload: _id,
});

export const getTourSuccess = (tour) => ({
    type: GET_TOUR_SUCCESS,
    payload: tour,
});

export const createTour = (data) => ({
    type: CREATE_TOUR,
    payload: data,
});

export const createTourSuccess = (tour) => ({
    type: CREATE_TOUR_SUCCESS,
    payload: tour,
});

export const updateTour = (inputData) => ({
    type: UPDATE_TOUR,
    payload: inputData,
});

export const updateTourSuccess = (tour) => ({
    type: UPDATE_TOUR_SUCCESS,
    payload: tour,
});

export const getSchedule = (_id) => ({
    type: TOUR_SCHEDULE,
    payload: _id,
});

export const getScheduleSuccess = (schedules) => ({
    type: TOUR_SCHEDULE_SUCCESS,
    payload: schedules,
});

export const getAllTourCategory = () => ({
    type: GET_ALL_TOUR_CATEGORY,
    payload: 'tour',
});

export const getAllTourCategorySuccess = (categories) => ({
    type: GET_ALL_TOUR_CATEGORY_SUCCESS,
    payload: categories,
});

export const createTourCategory = (title, type) => ({
    type: CREATE_TOUR_CATEGORY,
    payload: { title, type },
});

export const createTourCategorySuccess = (category) => ({
    type: CREATE_TOUR_CATEGORY_SUCCESS,
    payload: category,
});

export const updateTourCategory = (_id, title, type, status) => ({
    type: UPDATE_TOUR_CATEGORY,
    payload: { _id, title, type, status },
});

export const updateTourCategorySuccess = (category) => ({
    type: UPDATE_TOUR_CATEGORY_SUCCESS,
    payload: category,
});

export const getAllTourAttribute = () => ({
    type: GET_ALL_TOUR_ATTRIBUTE,
    payload: 'tour',
});

export const getAllTourAttributeSuccess = (attributes) => ({
    type: GET_ALL_TOUR_ATTRIBUTE_SUCCESS,
    payload: attributes,
});

export const createTourAttribute = (title, type) => ({
    type: CREATE_TOUR_ATTRIBUTE,
    payload: { title, type },
});

export const createTourAttributeSuccess = (attribute) => ({
    type: CREATE_TOUR_ATTRIBUTE_SUCCESS,
    payload: attribute,
});

export const updateTourAttribute = (_id, title, type, status) => ({
    type: UPDATE_TOUR_ATTRIBUTE,
    payload: { _id, title, type, status },
});

export const updateTourAttributeSuccess = (attribute) => ({
    type: UPDATE_TOUR_ATTRIBUTE_SUCCESS,
    payload: attribute,
});

export const addTourSchedule = (formInput) => ({
    type: ADD_TOUR_SCHEDULE,
    payload: formInput,
});

export const addTourScheduleSuccess = (schedule) => ({
    type: ADD_TOUR_SCHEDULE_SUCCESS,
    payload: schedule,
});

export const updateTourSchedule = (formInput) => ({
    type: UPDATE_TOUR_SCHEDULE,
    payload: formInput,
});

export const updateTourScheduleSuccess = (schedule) => ({
    type: UPDATE_TOUR_SCHEDULE_SUCCESS,
    payload: schedule,
});

export const tourHandleFailed = (error) => ({
    type: TOUR_HANDLE_FAILED,
    payload: error,
});
