import { GET_ALL_USER, GET_ALL_USER_SUCCESS, UPDATE_ROLE_USER, UPDATE_ROLE_USER_SUCCESS } from './constants';

const INIT_STATE = {
    users: null,
    loading: false,
    error: null,
};

const User = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_USER || UPDATE_ROLE_USER:
            return { ...state, loading: true };
        case GET_ALL_USER_SUCCESS:
            return { ...state, users: action.payload, loading: false, error: null };
        case UPDATE_ROLE_USER_SUCCESS:
            return { ...state, loading: false, error: null };
        default:
            return { ...state };
    }
};

export default User;
