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
    UPDATE_DESTINATION,
    UPDATE_DESTINATION_FAILED,
    UPDATE_DESTINATION_SUCCESS,
} from './constants';

export const getAllDestination = () => ({
    type: GET_ALL_DESTINATION,
});

export const getAllDestinationSuccess = (destinations) => ({
    type: GET_ALL_DESTINATION_SUCCESS,
    payload: destinations,
});

export const getAllDestinationFailed = (error) => ({
    type: GET_ALL_DESTINATION_FAILED,
    payload: error,
});

export const getDestination = (_id) => ({
    type: GET_DESTINATION,
    payload: _id,
});

export const getDestinationSuccess = (destination) => ({
    type: GET_DESTINATION_SUCCESS,
    payload: destination,
});

export const getDestinationFailed = (error) => ({
    type: GET_DESTINATION_FAILED,
    payload: error,
});

export const createDestination = (inputData) => ({
    type: CREATE_DESTINATION,
    payload: inputData,
});

export const createDestinationSuccess = (destination) => ({
    type: CREATE_DESTINATION_SUCCESS,
    payload: destination,
});

export const createDestinationFailed = (error) => ({
    type: CREATE_DESTINATION_FAILED,
    payload: error,
});

export const updateDestination = (inputData) => ({
    type: UPDATE_DESTINATION,
    payload: inputData,
});

export const updateDestinationSuccess = (destination) => ({
    type: UPDATE_DESTINATION_SUCCESS,
    payload: destination,
});

export const updateDestinationFailed = (error) => ({
    type: UPDATE_DESTINATION_FAILED,
    payload: error,
});
