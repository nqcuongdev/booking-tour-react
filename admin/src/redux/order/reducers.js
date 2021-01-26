import { GET_LIST_ORDER, GET_LIST_ORDER_SUCCESS, ORDER_FAILED } from './constants';

const INIT_STATE = {
    orders: null,
    order: null,
    loading: false,
    error: null,
};

const Order = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LIST_ORDER:
            return { ...state, loading: true };
        case GET_LIST_ORDER_SUCCESS:
            return { ...state, orders: action.payload, loading: false, error: null };
        case ORDER_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Order;
