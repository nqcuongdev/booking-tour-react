import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';
import { getAllHotelSuccess, hotelFailed } from './actions';
import { GET_ALL_HOTEL } from './constants';

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

export function* watchGetAllHotel() {
    yield takeEvery(GET_ALL_HOTEL, getAllHotel);
}

function* hotelSaga() {
    yield all([fork(watchGetAllHotel)]);
}

export default hotelSaga;
