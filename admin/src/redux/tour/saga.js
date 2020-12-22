import {
    createTourAttributeFailed,
    createTourAttributeSuccess,
    createTourCategoryFailed,
    createTourCategorySuccess,
    createTourFailed,
    createTourSuccess,
    getAllTourAttributeFailed,
    getAllTourAttributeSuccess,
    getAllTourCategoryFailed,
    getAllTourCategorySuccess,
    getAllTourFailed,
    getAllTourSuccess,
    updateTourAttributeFailed,
    updateTourAttributeSuccess,
    updateTourCategoryFailed,
    updateTourCategorySuccess,
} from './actions';
import {
    CREATE_TOUR,
    CREATE_TOUR_ATTRIBUTE,
    CREATE_TOUR_CATEGORY,
    GET_ALL_TOUR,
    GET_ALL_TOUR_ATTRIBUTE,
    GET_ALL_TOUR_CATEGORY,
    UPDATE_TOUR_ATTRIBUTE,
    UPDATE_TOUR_CATEGORY,
} from './constants';
import { call, put, takeEvery, all, fork, take } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';

const token = localStorage.getItem('jwtKey');

function* getAllTour() {
    const options = {
        method: 'GET',
    };
    try {
        const response = yield call(fetchJSON, 'tour', options);
        if (response && response.success) {
            yield put(getAllTourSuccess(response.data));
        } else {
            yield put(getAllTourFailed(response.message));
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
        yield put(getAllTourFailed(message));
    }
}

function* createTour({ data }) {
    const options = {
        body: data,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, 'tour/create', options);
        if (response && response.success) {
            yield put(createTourSuccess(response.data));
        } else {
            yield put(createTourFailed(response.message));
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
        yield put(createTourFailed(message));
    }
}

function* getAllTourCategory({ payload }) {
    const options = {
        method: 'GET',
    };
    try {
        const response = yield call(fetchJSON, `category/${payload}`, options);
        if (response && response.success) {
            yield put(getAllTourCategorySuccess(response.data));
        } else {
            yield put(getAllTourCategoryFailed(response.message));
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
        yield put(getAllTourCategoryFailed(message));
    }
}

function* createTourCategory({ payload: { title, type } }) {
    const options = {
        body: JSON.stringify({ title, type }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, 'category/create', options);
        if (response && response.success) {
            yield put(createTourCategorySuccess(response.data));
        } else {
            yield put(createTourCategoryFailed(response.message));
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
        yield put(createTourCategoryFailed(message));
    }
}

function* updateTourCategory({ payload: { _id, title, type, status } }) {
    const options = {
        body: JSON.stringify({ title, type, status }),
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, `category/update/${_id}`, options);
        if (response && response.success) {
            yield put(updateTourCategorySuccess(response.data));
        } else {
            yield put(updateTourCategoryFailed(response.message));
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
        yield put(updateTourCategoryFailed(message));
    }
}

function* getAllTourAttribute({ payload }) {
    const options = {
        method: 'GET',
    };
    try {
        const response = yield call(fetchJSON, `attribute/${payload}`, options);
        if (response && response.success) {
            yield put(getAllTourAttributeSuccess(response.data));
        } else {
            yield put(getAllTourAttributeFailed(response.message));
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
        yield put(getAllTourAttributeFailed(message));
    }
}

function* createTourAttribute({ payload: { title, type } }) {
    const options = {
        body: JSON.stringify({ title, type }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, 'attribute/create', options);
        if (response && response.success) {
            yield put(createTourAttributeSuccess(response.data));
        } else {
            yield put(createTourAttributeFailed(response.message));
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
        yield put(createTourAttributeFailed(message));
    }
}

function* updateTourAttribute({ payload: { _id, title, type, status } }) {
    const options = {
        body: JSON.stringify({ title, type, status }),
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, `category/update/${_id}`, options);
        if (response && response.success) {
            yield put(updateTourAttributeSuccess(response.data));
        } else {
            yield put(updateTourAttributeFailed(response.message));
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
        yield put(updateTourAttributeFailed(message));
    }
}

export function* watchGetAllTour() {
    yield takeEvery(GET_ALL_TOUR, getAllTour);
}

export function* watchCreateTour() {
    yield takeEvery(CREATE_TOUR, createTour);
}

export function* watchGetAllTourCategory() {
    yield takeEvery(GET_ALL_TOUR_CATEGORY, getAllTourCategory);
}

export function* watchCreateTourCategory() {
    yield takeEvery(CREATE_TOUR_CATEGORY, createTourCategory);
}

export function* watchUpdateTourCategory() {
    yield takeEvery(UPDATE_TOUR_CATEGORY, updateTourCategory);
}

export function* watchGetAllTourAttribute() {
    yield takeEvery(GET_ALL_TOUR_ATTRIBUTE, getAllTourAttribute);
}

export function* watchCreateTourAttribute() {
    yield takeEvery(CREATE_TOUR_ATTRIBUTE, createTourAttribute);
}

export function* watchUpdateTourAttribute() {
    yield takeEvery(UPDATE_TOUR_ATTRIBUTE, updateTourAttribute);
}

function* tourSaga() {
    yield all([
        fork(watchGetAllTour),
        fork(watchCreateTour),
        fork(watchGetAllTourCategory),
        fork(watchCreateTourCategory),
        fork(watchUpdateTourCategory),
        fork(watchGetAllTourAttribute),
        fork(watchCreateTourAttribute),
        fork(watchUpdateTourAttribute),
    ]);
}

export default tourSaga;
