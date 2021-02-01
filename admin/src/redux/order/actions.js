import { GET_INVOICE, GET_INVOICE_SUCCESS, GET_LIST_ORDER, GET_LIST_ORDER_SUCCESS, ORDER_FAILED } from './constants';

export const getListOrder = () => ({
    type: GET_LIST_ORDER,
});

export const getListOrderSuccess = (orders) => ({
    type: GET_LIST_ORDER_SUCCESS,
    payload: orders,
});

export const getInvoice = (id) => ({
    type: GET_INVOICE,
    payload: id,
});

export const getInvoiceSuccess = (invoice) => ({
    type: GET_INVOICE_SUCCESS,
    payload: invoice,
});

export const orderFailed = (error) => ({
    type: ORDER_FAILED,
    type: error,
});
