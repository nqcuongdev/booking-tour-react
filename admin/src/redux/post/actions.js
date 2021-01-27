import { GET_LIST_POST, GET_LIST_POST_SUCCESS, POST_FAILED } from './constants';

export const getAllPosts = () => ({
    type: GET_LIST_POST,
});

export const getAllPostsSuccess = (posts) => ({
    type: GET_LIST_POST_SUCCESS,
    payload: posts,
});

export const postFailed = (error) => ({
    type: POST_FAILED,
    payload: error,
});
