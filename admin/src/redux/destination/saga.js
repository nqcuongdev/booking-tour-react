import { getAllDestinationFailed, getAllDestinationSuccess } from './actions';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';
import { GET_ALL_DESTINATION } from './constants';

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

export function* watchGetAllDestination() {
    yield takeEvery(GET_ALL_DESTINATION, getAllDestination);
}

function* destinationSaga() {
    yield all([fork(watchGetAllDestination)]);
}

export default destinationSaga;
