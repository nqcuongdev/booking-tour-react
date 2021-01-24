import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';
import {
    createFacilitySuccess,
    createHotelSuccess,
    createRoomSuccess,
    getAllHotelFacilitySuccess,
    getAllHotelSuccess,
    getAllRoomSuccess,
    getAllTypeSuccess,
    getHotelSuccess,
    hotelFailed,
    updateFacilitySuccess,
    updateHotelSuccess,
    updateRoomSuccess,
} from './actions';
import {
    CREATE_FACILITY,
    CREATE_HOTEL,
    CREATE_ROOM,
    GET_ALL_FACILITY,
    GET_ALL_HOTEL,
    GET_ALL_ROOM,
    GET_ALL_TYPE,
    GET_HOTEL,
    UPDATE_FACILITY,
    UPDATE_HOTEL,
    UPDATE_ROOM,
} from './constants';

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

function* getHotel({ payload: id }) {
    const options = {
        method: 'GET',
    };

    try {
        const response = yield call(fetchJSON, `hotel/${id}`, options);
        if (response && response.success) {
            yield put(getHotelSuccess(response.data));
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

function* updateFacility({ payload: { _id, title, facility_type } }) {
    const options = {
        body: JSON.stringify({ title, facility_type }),
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, `facility/${_id}`, options);
        if (response && response.success) {
            yield put(updateFacilitySuccess(response.data));
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

function* createHotel({ payload: hotel }) {
    const options = {
        body: hotel,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, 'hotel/create', options);
        if (response && response.success) {
            yield put(createHotelSuccess(response.data));
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

function* createRoom({ payload: room }) {
    const options = {
        body: room,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, 'room/create', options);
        if (response && response.success) {
            yield put(createRoomSuccess(response.data));
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

function* updateRoom({ payload: room }) {
    const options = {
        body: room,
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };
    try {
        const response = yield call(fetchJSON, `room/${room.get('_id')}`, options);
        if (response && response.success) {
            yield put(updateRoomSuccess(response.data));
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

function* updateHotel({ payload: hotel }) {
    const options = {
        body: hotel,
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };
    try {
        const response = yield call(fetchJSON, `hotel/${hotel.get('_id')}`, options);
        if (response && response.success) {
            yield put(updateHotelSuccess(response.data));
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

function* getAllRoom({ payload: id }) {
    const options = {
        method: 'GET',
    };

    try {
        const response = yield call(fetchJSON, `room/hotel/${id}`, options);
        if (response && response.success) {
            yield put(getAllRoomSuccess(response.data));
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
    yield takeEvery(GET_ALL_FACILITY, getAllFacility);
}

export function* watchUpdateFacility() {
    yield takeEvery(UPDATE_FACILITY, updateFacility);
}

export function* watchCreateHotel() {
    yield takeEvery(CREATE_HOTEL, createHotel);
}

export function* watchUpdateHotel() {
    yield takeEvery(UPDATE_HOTEL, updateHotel);
}

export function* watchGetHotel() {
    yield takeEvery(GET_HOTEL, getHotel);
}

export function* watchGetAllRoom() {
    yield takeEvery(GET_ALL_ROOM, getAllRoom);
}

export function* watchCreateRoom() {
    yield takeEvery(CREATE_ROOM, createRoom);
}

export function* watchUpdateRoom() {
    yield takeEvery(UPDATE_ROOM, updateRoom);
}

function* hotelSaga() {
    yield all([
        fork(watchGetAllHotel),
        fork(watchGetAllHotelType),
        fork(watchCreateFacility),
        fork(watchGetAllFacility),
        fork(watchUpdateFacility),
        fork(watchCreateHotel),
        fork(watchUpdateHotel),
        fork(watchGetHotel),
        fork(watchGetAllRoom),
        fork(watchCreateRoom),
        fork(watchUpdateRoom),
    ]);
}

export default hotelSaga;
