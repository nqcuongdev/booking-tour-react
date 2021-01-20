import {
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

export const getAttributeHotel = () => ({
    type: GET_ATTRIBUTE_HOTEL,
    payload: 'hotel',
});

export const getAttributeHotelSuccess = (attributes) => ({
    type: GET_ATTRIBUTE_HOTEL_SUCCESS,
    payload: attributes,
});

export const hotelFailed = (errors) => ({
    type: HOTEL_ERROR,
    payload: errors,
});
