import {
    CREATE_FACILITY,
    CREATE_FACILITY_SUCCESS,
    CREATE_HOTEL,
    CREATE_HOTEL_SUCCESS,
    GET_ALL_FACILITY,
    GET_ALL_FACILITY_SUCCESS,
    GET_ALL_HOTEL,
    GET_ALL_HOTEL_SUCCESS,
    GET_ALL_TYPE,
    GET_ALL_TYPE_SUCCESS,
    GET_HOTEL,
    HOTEL_ERROR,
    UPDATE_FACILITY,
    UPDATE_FACILITY_SUCCESS,
    UPDATE_HOTEL,
    UPDATE_HOTEL_SUCCESS,
    GET_HOTEL_SUCCESS,
    GET_ALL_ROOM,
    GET_ALL_ROOM_SUCCESS,
    CREATE_ROOM,
    CREATE_ROOM_SUCCESS,
} from './constants';

export const getAllHotel = () => ({
    type: GET_ALL_HOTEL,
});

export const getAllHotelSuccess = (hotels) => ({
    type: GET_ALL_HOTEL_SUCCESS,
    payload: hotels,
});

export const createHotel = (hotel) => ({
    type: CREATE_HOTEL,
    payload: hotel,
});

export const createHotelSuccess = (hotel) => ({
    type: CREATE_HOTEL_SUCCESS,
    payload: hotel,
});

export const updateHotel = (hotel) => ({
    type: UPDATE_HOTEL,
    payload: hotel,
});

export const updateHotelSuccess = (hotel) => ({
    type: UPDATE_HOTEL_SUCCESS,
    payload: hotel,
});

export const getHotel = (id) => ({
    type: GET_HOTEL,
    payload: id,
});

export const getHotelSuccess = (hotel) => ({
    type: GET_HOTEL_SUCCESS,
    payload: hotel,
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

export const updateFacility = (_id, title, facility_type) => ({
    type: UPDATE_FACILITY,
    payload: { _id, title, facility_type },
});

export const updateFacilitySuccess = (facility) => ({
    type: UPDATE_FACILITY_SUCCESS,
});

export const hotelFailed = (errors) => ({
    type: HOTEL_ERROR,
    payload: errors,
});

export const getAllRoom = (id) => ({
    type: GET_ALL_ROOM,
    payload: id,
});

export const getAllRoomSuccess = (rooms) => ({
    type: GET_ALL_ROOM_SUCCESS,
    payload: rooms,
});

export const createRoom = (room) => ({
    type: CREATE_ROOM,
    payload: room,
});

export const createRoomSuccess = (room) => ({
    type: CREATE_ROOM_SUCCESS,
    payload: room,
});
