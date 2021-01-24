// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';

import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, FORGET_PASSWORD, RECEIVER_AUTH, LOGIN_WITH_GOOGLE } from './constants';

import {
    loginUserSuccess,
    loginUserFailed,
    registerUserSuccess,
    registerUserFailed,
    forgetPasswordSuccess,
    forgetPasswordFailed,
    receiverAuthSuccess,
} from './actions';

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { email, password } }) {
    const options = {
        body: JSON.stringify({ email, password }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        let roles = ['admin', 'hotel_partner', 'tour_partner'];
        const response = yield call(fetchJSON, 'login', options);
        if (response && response.success) {
            if (roles.includes(response.data.role)) {
                localStorage.setItem('jwtKey', response.token);
                yield put(loginUserSuccess(response.data));
            } else {
                let message = 'You not have permission';
                yield put(loginUserFailed(message));
            }
        } else {
            yield put(loginUserFailed(response.message));
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
        yield put(loginUserFailed(message));
    }
}

function* loginWithGoogle({ payload: { tokenId, googleId } }) {
    const options = {
        body: JSON.stringify({ tokenId, googleId }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        let roles = ['admin', 'hotel_partner', 'tour_partner'];
        const response = yield call(fetchJSON, 'google', options);
        if (response.success) {
            if (roles.includes(response.data.role)) {
                localStorage.setItem('jwtKey', response.token);
                yield put(loginUserSuccess(response.data));
            } else {
                let message = 'You not have permission';
                yield put(loginUserFailed(message));
            }
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
        yield put(loginUserFailed(message));
    }
}

/**
 * Check user has logged in
 */
function* receiveAuth() {
    let token = localStorage.getItem('jwtKey');
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, 'user/me', options);
        if (response && response.success) {
            yield put(receiverAuthSuccess(response.data));
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Logout the user
 * @param {*} param0
 */
function* logout({ payload: { history } }) {
    try {
        localStorage.removeItem('jwtKey');
        yield call(() => {
            history.push('/account/login');
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Register the user
 */
function* register({ payload: { fullname, email, password } }) {
    const options = {
        body: JSON.stringify({ fullname, email, password }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = yield call(fetchJSON, '/users/register', options);
        yield put(registerUserSuccess(response));
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
        yield put(registerUserFailed(message));
    }
}

/**
 * forget password
 */
function* forgetPassword({ payload: { username } }) {
    const options = {
        body: JSON.stringify({ username }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = yield call(fetchJSON, '/users/password-reset', options);
        yield put(forgetPasswordSuccess(response.message));
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
        yield put(forgetPasswordFailed(message));
    }
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchLoginInGoogle() {
    yield takeEvery(LOGIN_WITH_GOOGLE, loginWithGoogle);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword() {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

export function* watchReceiverAuth() {
    yield takeEvery(RECEIVER_AUTH, receiveAuth);
}

function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchForgetPassword),
        fork(receiveAuth),
        fork(watchLoginInGoogle),
    ]);
}

export default authSaga;
