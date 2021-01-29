import {
    CREATE_POST,
    CREATE_POST_SUCCESS,
    CREATE_POST_TAG,
    CREATE_POST_TAG_SUCCESS,
    GET_LIST_CATEGORY,
    GET_LIST_CATEGORY_SUCCESS,
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

const INIT_STATE = {
    posts: null,
    post: null,
    loading: false,
    error: null,
    categories: null,
    tags: null,
};

const Post = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LIST_POST ||
            GET_LIST_POST_TAG ||
            CREATE_POST_TAG ||
            UPDATE_POST_TAG ||
            GET_POST ||
            GET_LIST_CATEGORY ||
            CREATE_POST ||
            UPDATE_POST:
            return { ...state, loading: true };
        case GET_LIST_POST_SUCCESS:
            return { ...state, posts: action.payload, loading: false, error: null };
        case GET_LIST_CATEGORY_SUCCESS:
            return { ...state, categories: action.payload, loading: false, error: null };
        case GET_LIST_POST_TAG_SUCCESS:
            return { ...state, tags: action.payload, loading: false, error: null };
        case GET_POST_SUCCESS:
            return { ...state, post: action.payload, loading: false, error: null };
        case CREATE_POST_SUCCESS:
            return { ...state, post: action.payload, loading: false, error: null };
        case UPDATE_POST_SUCCESS:
            return { ...state, post: action.payload, loading: false, error: null };
        case CREATE_POST_TAG_SUCCESS:
            return { ...state, loading: false, error: null };
        case UPDATE_POST_TAG_SUCCESS:
            return { ...state, loading: false, error: null };
        case POST_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Post;
