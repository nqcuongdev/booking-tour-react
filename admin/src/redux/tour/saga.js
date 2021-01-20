import {
    addTourScheduleSuccess,
    createTourAttributeSuccess,
    createTourCategorySuccess,
    createTourSuccess,
    getAllTourAttributeSuccess,
    getAllTourCategorySuccess,
    getAllTourSuccess,
    getScheduleSuccess,
    getTourSuccess,
    tourHandleFailed,
    updateTourAttributeSuccess,
    updateTourCategorySuccess,
    updateTourScheduleSuccess,
    updateTourSuccess,
} from './actions';
import {
    ADD_TOUR_SCHEDULE,
    CREATE_TOUR,
    CREATE_TOUR_ATTRIBUTE,
    CREATE_TOUR_CATEGORY,
    GET_ALL_TOUR,
    GET_ALL_TOUR_ATTRIBUTE,
    GET_ALL_TOUR_CATEGORY,
    GET_TOUR,
    TOUR_SCHEDULE,
    UPDATE_TOUR,
    UPDATE_TOUR_ATTRIBUTE,
    UPDATE_TOUR_CATEGORY,
    UPDATE_TOUR_SCHEDULE,
} from './constants';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
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
            yield put(tourHandleFailed(response.message));
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
        yield put(tourHandleFailed(message));
    }
}

function* createTour({ payload: data }) {
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
            yield put(tourHandleFailed(response.message));
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
        yield put(tourHandleFailed(message));
    }
}

function* updateTour({ payload: inputData }) {
    const options = {
        body: inputData,
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };
    try {
        const response = yield call(fetchJSON, `tour/${inputData.get('_id')}`, options);
        if (response && response.success) {
            yield put(updateTourSuccess(response.data));
        } else {
            yield put(tourHandleFailed(response.message));
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
        yield put(tourHandleFailed(message));
    }
}

function* getTour({ payload: _id }) {
    const options = {
        method: 'GET',
    };

    try {
        const response = yield call(fetchJSON, `tour/${_id}`, options);
        if (response && response.success) {
            yield put(getTourSuccess(response.data));
        } else {
            yield put(tourHandleFailed(response.message));
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
        yield put(tourHandleFailed(message));
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
            yield put(tourHandleFailed(response.message));
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
        yield put(tourHandleFailed(message));
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
            yield put(tourHandleFailed(response.message));
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
        yield put(tourHandleFailed(message));
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
            yield put(tourHandleFailed(response.message));
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
        yield put(tourHandleFailed(message));
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
            yield put(tourHandleFailed(response.message));
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
        yield put(tourHandleFailed(message));
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
            yield put(tourHandleFailed(response.message));
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
        yield put(tourHandleFailed(message));
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
        const response = yield call(fetchJSON, `attribute/update/${_id}`, options);
        if (response && response.success) {
            yield put(updateTourAttributeSuccess(response.data));
        } else {
            yield put(tourHandleFailed(response.message));
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
        yield put(tourHandleFailed(message));
    }
}

function* getSchedule({ payload: _id }) {
    const options = {
        method: 'GET',
    };

    try {
        const response = yield call(fetchJSON, `tour/${_id}/schedule`, options);
        if (response && response.success) {
            yield put(getScheduleSuccess(response.data));
        } else {
            yield put(tourHandleFailed(response.message));
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
        yield put(tourHandleFailed(message));
    }
}

function* addTourSchedule({ payload: { start, end, available, tour_id } }) {
    const options = {
        body: JSON.stringify({ start, end, available }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, `tour/${tour_id}/schedule`, options);
        if (response && response.success) {
            yield put(addTourScheduleSuccess(response.data));
        } else {
            yield put(tourHandleFailed(response.message));
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
        yield put(tourHandleFailed(message));
    }
}

function* updateTourSchedule({ payload: { start, end, available, _id } }) {
    const options = {
        body: JSON.stringify({ start, end, available }),
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, `tour/schedule/${_id}`, options);
        if (response && response.success) {
            yield put(updateTourScheduleSuccess(response.data));
        } else {
            yield put(tourHandleFailed(response.message));
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
        yield put(tourHandleFailed(message));
    }
}

export function* watchGetAllTour() {
    yield takeEvery(GET_ALL_TOUR, getAllTour);
}

export function* watchGetTour() {
    yield takeEvery(GET_TOUR, getTour);
}

export function* watchAddScheduleTour() {
    yield takeEvery(ADD_TOUR_SCHEDULE, addTourSchedule);
}

export function* watchGetSchedule() {
    yield takeEvery(TOUR_SCHEDULE, getSchedule);
}

export function* watchCreateTour() {
    yield takeEvery(CREATE_TOUR, createTour);
}

export function* watchUpdateTour() {
    yield takeEvery(UPDATE_TOUR, updateTour);
}

export function* watchUpdateScheduleTour() {
    yield takeEvery(UPDATE_TOUR_SCHEDULE, updateTourSchedule);
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
        fork(watchGetTour),
        fork(watchGetSchedule),
        fork(watchUpdateScheduleTour),
        fork(watchAddScheduleTour),
        fork(watchCreateTour),
        fork(watchUpdateTour),
        fork(watchGetAllTourCategory),
        fork(watchCreateTourCategory),
        fork(watchUpdateTourCategory),
        fork(watchGetAllTourAttribute),
        fork(watchCreateTourAttribute),
        fork(watchUpdateTourAttribute),
    ]);
}

export default tourSaga;
