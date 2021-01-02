import { GET_ALL_NOTIFICATION, GET_ALL_NOTIFICATION_FAILED, GET_ALL_NOTIFICATION_SUCCESS } from './constants';

const INIT_STATE = {
    notifications: null,
    notification: null,
    loading: false,
    error: null,
};

const Notification = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_NOTIFICATION:
            return { ...state, loading: true };
        case GET_ALL_NOTIFICATION_SUCCESS:
            return { ...state, notifications: action.payload, loading: false, error: null };
        case GET_ALL_NOTIFICATION_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Notification;
