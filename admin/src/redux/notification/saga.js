import { call, put, takeEvery, all, fork, take } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';
import { getAllNotificationFailed, getAllNotificationSuccess } from './actions';
import { GET_ALL_NOTIFICATION } from './constants';
const token = localStorage.getItem('jwtKey');

function* getAllNotification() {
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, 'notification', options);
        if (response && response.success) {
            yield put(getAllNotificationSuccess(response.data));
        } else {
            yield put(getAllNotificationFailed(response.message));
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
        yield put(getAllNotificationFailed(message));
    }
}

export function* watchGetAllNotification() {
    yield takeEvery(GET_ALL_NOTIFICATION, getAllNotification);
}

function* notificationSaga() {
    yield all([fork(watchGetAllNotification)]);
}

export default notificationSaga;
