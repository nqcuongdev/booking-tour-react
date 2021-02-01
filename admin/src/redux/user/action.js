import {
    GET_ALL_USER,
    GET_ALL_USER_SUCCESS,
    UPDATE_ROLE_USER,
    UPDATE_ROLE_USER_SUCCESS,
    USER_FAILED,
} from './constants';

export const getAllUser = () => ({
    type: GET_ALL_USER,
});

export const getAllUserSuccess = (users) => ({
    type: GET_ALL_USER_SUCCESS,
    payload: users,
});

export const updateUserRole = (_id, role) => ({
    type: UPDATE_ROLE_USER,
    payload: { _id, role },
});

export const updateUserRoleSuccess = () => ({
    type: UPDATE_ROLE_USER_SUCCESS,
});

export const userFailed = (error) => ({
    type: USER_FAILED,
    payload: error,
});
