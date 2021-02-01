import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';
import {
    createPostSuccess,
    createPostTagSuccess,
    getAllPostsSuccess,
    getListOfPostTagsSuccess,
    getListOfTitleCategoriesSuccess,
    getPostSuccess,
    postFailed,
    updatePostSuccess,
    updatePostTagSuccess,
} from './actions';
import {
    CREATE_POST,
    CREATE_POST_TAG,
    GET_LIST_CATEGORY,
    GET_LIST_POST,
    GET_LIST_POST_TAG,
    GET_POST,
    UPDATE_POST,
    UPDATE_POST_TAG,
} from './constants';

const token = localStorage.getItem('jwtKey');

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

function* getPost({ payload: id }) {
    const options = {
        method: 'GET',
    };

    try {
        const response = yield call(fetchJSON, `post/${id}`, options);
        if (response && response.success) {
            yield put(getPostSuccess(response.data));
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

function* getAllCategories() {
    const options = {
        method: 'GET',
    };

    try {
        const response = yield call(fetchJSON, 'category', options);
        if (response && response.success) {
            yield put(getListOfTitleCategoriesSuccess(response.data));
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

function* getAllTag() {
    const options = {
        method: 'GET',
    };

    try {
        const response = yield call(fetchJSON, 'tag', options);
        if (response && response.success) {
            yield put(getListOfPostTagsSuccess(response.data));
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

function* createPost({ payload: data }) {
    const options = {
        body: data,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, 'post/create', options);
        if (response && response.success) {
            yield put(createPostSuccess(response.data));
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

function* updatePost({ payload: data }) {
    const options = {
        body: data,
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };
    try {
        const response = yield call(fetchJSON, `post/${data.get('_id')}`, options);
        if (response && response.success) {
            yield put(updatePostSuccess(response.data));
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

function* createPostTag({ payload: { title } }) {
    const options = {
        body: JSON.stringify({ title }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, 'tag/create', options);
        if (response && response.success) {
            yield put(createPostTagSuccess(response.data));
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

function* updatePostTag({ payload: { _id, title, status } }) {
    const options = {
        body: JSON.stringify({ title, status }),
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const response = yield call(fetchJSON, `tag/${_id}/update`, options);
        if (response && response.success) {
            yield put(updatePostTagSuccess(response.data));
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

export function* watchGetAllTag() {
    yield takeEvery(GET_LIST_POST_TAG, getAllTag);
}

export function* watchCreatePostTag() {
    yield takeEvery(CREATE_POST_TAG, createPostTag);
}

export function* watchUpdatePostTag() {
    yield takeEvery(UPDATE_POST_TAG, updatePostTag);
}

export function* watchGetPost() {
    yield takeEvery(GET_POST, getPost);
}

export function* watchGetAllCategories() {
    yield takeEvery(GET_LIST_CATEGORY, getAllCategories);
}

export function* watchCreatePost() {
    yield takeEvery(CREATE_POST, createPost);
}

export function* watchUpdatePost() {
    yield takeEvery(UPDATE_POST, updatePost);
}

function* postSaga() {
    yield all([
        fork(watchGetListPost),
        fork(watchCreatePostTag),
        fork(watchUpdatePostTag),
        fork(watchGetAllTag),
        fork(watchGetPost),
        fork(watchGetAllCategories),
        fork(watchCreatePost),
        fork(watchUpdatePost),
    ]);
}

export default postSaga;
