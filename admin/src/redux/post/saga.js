import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';
import { getAllPostsSuccess, postFailed } from './actions';
import { GET_LIST_POST } from './constants';

function* getAllPost() {
    const options = {
        method: 'GET',
    };

    try {
        const response = yield call(fetchJSON, 'post', options);
        if (response && response.success) {
            yield put(getAllPostsSuccess(response.data));
        } else {
            yield put(postFailed(response.message));
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
        yield put(postFailed(message));
    }
}

export function* watchGetListPost() {
    yield takeEvery(GET_LIST_POST, getAllPost);
}

function* postSaga() {
    yield all([fork(watchGetListPost)]);
}

export default postSaga;
