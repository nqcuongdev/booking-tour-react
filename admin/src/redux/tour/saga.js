import {
    createTourCategoryFailed,
    createTourCategorySuccess,
    getAllTourCategoryFailed,
    getAllTourCategorySuccess,
} from './actions';
import { CREATE_TOUR_CATEGORY, GET_ALL_TOUR_CATEGORY } from './constants';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';

const token = localStorage.getItem('jwtKey');

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

export function* watchGetAllTourCategory() {
    yield takeEvery(GET_ALL_TOUR_CATEGORY, getAllTourCategory);
}

export function* watchCreateTourCategory() {
    yield takeEvery(CREATE_TOUR_CATEGORY, createTourCategory);
}

function* tourSaga() {
    yield all([fork(watchGetAllTourCategory), fork(watchCreateTourCategory)]);
}

export default tourSaga;
