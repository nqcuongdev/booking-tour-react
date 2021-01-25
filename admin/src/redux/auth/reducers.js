// @flow
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAILED,
    RECEIVER_AUTH_SUCCESS,
    LOGIN_WITH_GOOGLE_FAILURE,
    LOGIN_WITH_GOOGLE,
    LOGIN_WITH_GOOGLE_SUCCESS,
} from './constants';

const INIT_STATE = {
    user: null,
    loading: false,
};

const Auth = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER || LOGIN_WITH_GOOGLE:
            return { ...state, loading: true };
        case LOGIN_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };
        case LOGIN_WITH_GOOGLE_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };
        case LOGIN_USER_FAILED || LOGIN_WITH_GOOGLE_FAILURE:
            return { ...state, error: action.payload, loading: false };
        case REGISTER_USER:
            return { ...state, loading: true };
        case REGISTER_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };
        case REGISTER_USER_FAILED:
            return { ...state, error: action.payload, loading: false };
        case LOGOUT_USER:
            return { ...state, user: null };
        case FORGET_PASSWORD:
            return { ...state, loading: true };
        case FORGET_PASSWORD_SUCCESS:
            return { ...state, passwordResetStatus: action.payload, loading: false, error: null };
        case FORGET_PASSWORD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case RECEIVER_AUTH_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };
        default:
            return { ...state };
    }
};

export default Auth;
