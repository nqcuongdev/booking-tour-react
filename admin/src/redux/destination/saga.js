import {
    createDestinationFailed,
    createDestinationSuccess,
    getAllDestinationFailed,
    getAllDestinationSuccess,
    getDestinationSuccess,
    getDestinationFailed,
} from './actions';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';
import { CREATE_DESTINATION, GET_ALL_DESTINATION, GET_DESTINATION } from './constants';

const token = localStorage.getItem('jwtKey');

function* getAllDestination() {
    const options = {
        method: 'GET',
    };
    try {
        const response = yield call(fetchJSON, 'destination', options);
        if (response && response.success) {
            yield put(getAllDestinationSuccess(response.data));
        } else {
            yield put(getAllDestinationFailed(response.message));
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
        yield put(getAllDestinationFailed(message));
    }
}

function* createDestination({ payload: inputData }) {
    const options = {
        body: inputData,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, 'destination/create', options);
        if (response && response.success) {
            yield put(createDestinationSuccess(response.data));
        } else {
            yield put(createDestinationFailed(response.message));
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
        yield put(createDestinationFailed(message));
    }
}

function* getDestination({ payload: _id }) {
    const options = {
        method: 'GET',
    };

    try {
        const response = yield call(fetchJSON, `destination/${_id}`, options);
        if (response && response.success) {
            yield put(getDestinationSuccess(response.data));
        } else {
            yield put(getDestinationFailed(response.message));
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
        yield put(getDestinationFailed(message));
    }
}

export function* watchGetAllDestination() {
    yield takeEvery(GET_ALL_DESTINATION, getAllDestination);
}

export function* watchCreateDestination() {
    yield takeEvery(CREATE_DESTINATION, createDestination);
}

export function* watchGetDestination() {
    yield takeEvery(GET_DESTINATION, getDestination);
}

function* destinationSaga() {
    yield all([fork(watchGetAllDestination), fork(watchCreateDestination), fork(watchGetDestination)]);
}

export default destinationSaga;
