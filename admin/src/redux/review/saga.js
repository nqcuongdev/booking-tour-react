import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';
import { deleteReviewSuccess, getListReviewsSuccess, reviewFailed } from './actions';
import { DELETE_REVIEW, GET_LIST_REVIEWS } from './constants';

const token = localStorage.getItem('jwtKey');

function* getListReviews() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, 'rating', options);
        if (response && response.success) {
            yield put(getListReviewsSuccess(response.data));
        } else {
            yield put(reviewFailed(response.message));
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

function* deleteReview({ payload: id }) {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, `rating/${id}`, options);
        if (response && response.success) {
            yield put(deleteReviewSuccess(response.data));
        } else {
            yield put(reviewFailed(response.message));
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

export function* watchGetListReviews() {
    yield takeEvery(GET_LIST_REVIEWS, getListReviews);
}

export function* watchDeleteReview() {
    yield takeEvery(DELETE_REVIEW, deleteReview);
}

function* reviewSaga() {
    yield all([fork(watchGetListReviews), fork(watchDeleteReview)]);
}

export default reviewSaga;
