import { GET_LIST_ORDER, GET_LIST_ORDER_SUCCESS, ORDER_FAILED } from './constants';

export const getListOrder = () => ({
    type: GET_LIST_ORDER,
});

export const getListOrderSuccess = (orders) => ({
    type: GET_LIST_ORDER_SUCCESS,
    payload: orders,
});

export const orderFailed = (error) => ({
    type: ORDER_FAILED,
    type: error,
});
