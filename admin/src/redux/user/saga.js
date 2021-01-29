import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';
import { getAllUserSuccess, updateUserRoleSuccess, userFailed } from './action';
import { GET_ALL_USER, UPDATE_ROLE_USER } from './constants';

const token = localStorage.getItem('jwtKey');

function* getListUsers() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, 'user', options);
        if (response && response.success) {
            yield put(getAllUserSuccess(response.data));
        } else {
            yield put(userFailed(response.message));
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
        yield put(reviewFailed(message));
    }
}

function* updateUserRole({ payload: { _id, role } }) {
    const options = {
        body: JSON.stringify({ role }),
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, `user/${_id}`, options);
        if (response && response.success) {
            yield put(updateUserRoleSuccess(response.data));
        } else {
            yield put(userFailed(response.message));
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
        yield put(userFailed(message));
    }
}

export function* watchUpdateUserRole() {
    yield takeEvery(UPDATE_ROLE_USER, updateUserRole);
}

export function* watchGetListUser() {
    yield takeEvery(GET_ALL_USER, getListUsers);
}

function* userSaga() {
    yield all([fork(watchGetListUser), fork(watchUpdateUserRole)]);
}

export default userSaga;
