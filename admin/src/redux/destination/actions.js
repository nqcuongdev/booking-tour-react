import { GET_ALL_DESTINATION, GET_ALL_DESTINATION_FAILED, GET_ALL_DESTINATION_SUCCESS } from './constants';

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
