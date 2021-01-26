import { call, put, takeEvery, all, fork, take } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';
import { getListOrderSuccess, orderFailed } from './actions';
import { GET_LIST_ORDER } from './constants';
const token = localStorage.getItem('jwtKey');

function* getAllOrder() {
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, 'booking', options);
        if (response && response.success) {
            yield put(getListOrderSuccess(response.data));
        } else {
            yield put(orderFailed(response.message));
        }
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(orderFailed(message));
    }
}

export function* watchGetAllOrder() {
    yield takeEvery(GET_LIST_ORDER, getAllOrder);
}

function* orderSaga() {
    yield all([fork(watchGetAllOrder)]);
}

export default orderSaga;
