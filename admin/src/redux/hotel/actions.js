import {
    CREATE_FACILITY,
    CREATE_FACILITY_SUCCESS,
    GET_ALL_FACILITY,
    GET_ALL_FACILITY_SUCCESS,
    GET_ALL_HOTEL,
    GET_ALL_HOTEL_SUCCESS,
    GET_ALL_TYPE,
    GET_ALL_TYPE_SUCCESS,
    GET_ATTRIBUTE_HOTEL,
    GET_ATTRIBUTE_HOTEL_SUCCESS,
    HOTEL_ERROR,
} from './constants';

export const getAllHotel = () => ({
    type: GET_ALL_HOTEL,
});

export const getAllHotelSuccess = (hotels) => ({
    type: GET_ALL_HOTEL_SUCCESS,
    payload: hotels,
});

export const getAllType = () => ({
    type: GET_ALL_TYPE,
    payload: 'hotel',
});

export const getAllTypeSuccess = (types) => ({
    type: GET_ALL_TYPE_SUCCESS,
    payload: types,
});

export const createFacility = (facility) => ({
    type: CREATE_FACILITY,
    payload: facility,
});

export const createFacilitySuccess = (facility) => ({
    type: CREATE_FACILITY_SUCCESS,
    payload: facility,
});

export const getAllHotelFacility = () => ({
    type: GET_ALL_FACILITY,
    payload: 'hotel',
});

export const getAllHotelFacilitySuccess = (facilities) => ({
    type: GET_ALL_FACILITY_SUCCESS,
    payload: facilities,
});

export const hotelFailed = (errors) => ({
    type: HOTEL_ERROR,
    payload: errors,
});
