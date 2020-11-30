import {
    createDestinationFailed,
    createDestinationSuccess,
    getAllDestinationFailed,
    getAllDestinationSuccess,
} from './actions';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';
import { CREATE_DESTINATION, GET_ALL_DESTINATION } from './constants';

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
        body: JSON.stringify(inputData),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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

export function* watchGetAllDestination() {
    yield takeEvery(GET_ALL_DESTINATION, getAllDestination);
}

export function* watchCreateDestination() {
    yield takeEvery(CREATE_DESTINATION, createDestination);
}

function* destinationSaga() {
    yield all([fork(watchGetAllDestination), fork(watchCreateDestination)]);
}

export default destinationSaga;
