import {
    CREATE_POST,
    CREATE_POST_SUCCESS,
    CREATE_POST_TAG,
    CREATE_POST_TAG_SUCCESS,
    GET_LIST_CATEGORY,
    GET_LIST_POST,
    GET_LIST_POST_SUCCESS,
    GET_LIST_POST_TAG,
    GET_LIST_POST_TAG_SUCCESS,
    GET_POST,
    GET_POST_SUCCESS,
    POST_FAILED,
    UPDATE_POST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_TAG,
    UPDATE_POST_TAG_SUCCESS,
} from './constants';

export const getAllPosts = () => ({
    type: GET_LIST_POST,
});

export const getAllPostsSuccess = (posts) => ({
    type: GET_LIST_POST_SUCCESS,
    payload: posts,
});

export const getPost = (id) => ({
    type: GET_POST,
    payload: id,
});

export const getPostSuccess = (post) => ({
    type: GET_POST_SUCCESS,
    payload: post,
});

export const getListOfTitleCategories = () => ({
    type: GET_LIST_CATEGORY,
});

export const getListOfTitleCategoriesSuccess = (categories) => ({
    type: GET_LIST_CATEGORY,
    payload: categories,
});

export const getListOfPostTags = () => ({
    type: GET_LIST_POST_TAG,
});

export const getListOfPostTagsSuccess = (tags) => ({
    type: GET_LIST_POST_TAG_SUCCESS,
    payload: tags,
});

export const createPost = (data) => ({
    type: CREATE_POST,
    payload: data,
});

export const createPostSuccess = (post) => ({
    type: CREATE_POST_SUCCESS,
    payload: post,
});

export const createPostTag = (title) => ({
    type: CREATE_POST_TAG,
    payload: { title },
});

export const createPostTagSuccess = (tag) => ({
    type: CREATE_POST_TAG_SUCCESS,
});

export const updatePost = (data) => ({
    type: UPDATE_POST,
    payload: data,
});

export const updatePostSuccess = (post) => ({
    type: UPDATE_POST_SUCCESS,
    payload: post,
});

export const updatePostTag = (_id, title, status) => ({
    type: UPDATE_POST_TAG,
    payload: { _id, title, status },
});

export const updatePostTagSuccess = (category) => ({
    type: UPDATE_POST_TAG_SUCCESS,
});

export const postFailed = (error) => ({
    type: POST_FAILED,
    payload: error,
});
