import { GET_ALL_NOTIFICATION, GET_ALL_NOTIFICATION_FAILED, GET_ALL_NOTIFICATION_SUCCESS } from './constants';

export const getAllNotification = () => ({
    type: GET_ALL_NOTIFICATION,
});

export const getAllNotificationSuccess = (notifications) => ({
    type: GET_ALL_NOTIFICATION_SUCCESS,
    payload: notifications,
});

export const getAllNotificationFailed = (error) => ({
    type: GET_ALL_NOTIFICATION_FAILED,
    payload: error,
});
