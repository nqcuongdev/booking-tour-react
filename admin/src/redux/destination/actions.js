import {
    CREATE_DESTINATION,
    CREATE_DESTINATION_FAILED,
    CREATE_DESTINATION_SUCCESS,
    GET_ALL_DESTINATION,
    GET_ALL_DESTINATION_FAILED,
    GET_ALL_DESTINATION_SUCCESS,
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
