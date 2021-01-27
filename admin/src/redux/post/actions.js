import {
    CREATE_POST_CATEGORY,
    CREATE_POST_CATEGORY_SUCCESS,
    CREATE_POST_TAG,
    CREATE_POST_TAG_SUCCESS,
    GET_LIST_POST,
    GET_LIST_POST_CATEGORY,
    GET_LIST_POST_CATEGORY_SUCCESS,
    GET_LIST_POST_SUCCESS,
    GET_LIST_POST_TAG,
    GET_LIST_POST_TAG_SUCCESS,
    POST_FAILED,
    UPDATE_POST_CATEGORY,
    UPDATE_POST_CATEGORY_SUCCESS,
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

export const getListOfTitleCategories = () => ({
    type: GET_LIST_POST_CATEGORY,
});

export const getListOfTitleCategoriesSuccess = (categories) => ({
    type: GET_LIST_POST_CATEGORY_SUCCESS,
    payload: categories,
});

export const createPostCategory = (title, type) => ({
    type: CREATE_POST_CATEGORY,
    payload: { title, type },
});

export const createPostCategorySuccess = (category) => ({
    type: CREATE_POST_CATEGORY_SUCCESS,
});

export const updatePostCategory = (_id, title, type, status) => ({
    type: UPDATE_POST_CATEGORY,
    payload: { _id, title, type, status },
});

export const updatePostCategorySuccess = (category) => ({
    type: UPDATE_POST_CATEGORY_SUCCESS,
});

export const getListOfPostTags = () => ({
    type: GET_LIST_POST_TAG,
});

export const getListOfPostTagsSuccess = (tags) => ({
    type: GET_LIST_POST_TAG_SUCCESS,
    payload: tags,
});

export const createPostTag = (title) => ({
    type: CREATE_POST_TAG,
    payload: { title },
});

export const createPostTagSuccess = (tag) => ({
    type: CREATE_POST_TAG_SUCCESS,
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
