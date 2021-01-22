import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';
import {
    createFacilitySuccess,
    getAllHotelFacilitySuccess,
    getAllHotelSuccess,
    getAllTypeSuccess,
    hotelFailed,
} from './actions';
import { CREATE_FACILITY, GET_ALL_HOTEL, GET_ALL_TYPE } from './constants';

const token = localStorage.getItem('jwtKey');

function* getAllHotel() {
    const options = {
        method: 'GET',
    };

    try {
        const response = yield call(fetchJSON, 'hotel', options);
        if (response && response.success) {
            yield put(getAllHotelSuccess(response.data));
        } else {
            yield put(hotelFailed(response.message));
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
        yield put(hotelFailed(message));
    }
}

function* getHotelType({ payload }) {
    const options = {
        method: 'GET',
    };
    try {
        const response = yield call(fetchJSON, `category/${payload}`, options);
        if (response && response.success) {
            yield put(getAllTypeSuccess(response.data));
        } else {
            yield put(hotelFailed(response.message));
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
        yield put(hotelFailed(message));
    }
}

function* createFacility({ payload: facility }) {
    const options = {
        body: JSON.stringify({ title: facility.title, facility_type: facility.facility_type }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, 'facility/create', options);
        if (response && response.success) {
            yield put(createFacilitySuccess(response.data));
        } else {
            yield put(hotelFailed(response.message));
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
        yield put(hotelFailed(message));
    }
}

function* getAllFacility() {
    const options = {
        method: 'GET',
    };

    try {
        const response = yield call(fetchJSON, 'facility', options);
        if (response && response.success) {
            yield put(getAllHotelFacilitySuccess(response.data));
        } else {
            yield put(hotelFailed(response.message));
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
        yield put(hotelFailed(message));
    }
}

export function* watchGetAllHotel() {
    yield takeEvery(GET_ALL_HOTEL, getAllHotel);
}

export function* watchGetAllHotelType() {
    yield takeEvery(GET_ALL_TYPE, getHotelType);
}

export function* watchCreateFacility() {
    yield takeEvery(CREATE_FACILITY, createFacility);
}

export function* watchGetAllFacility() {
    yield takeEvery(CREATE_FACILITY, getAllFacility);
}

function* hotelSaga() {
    yield all([
        fork(watchGetAllHotel),
        fork(watchGetAllHotelType),
        fork(watchCreateFacility),
        fork(watchGetAllFacility),
    ]);
}

export default hotelSaga;
