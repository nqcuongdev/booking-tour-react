import { GET_LIST_POST, GET_LIST_POST_SUCCESS, POST_FAILED } from './constants';

const INIT_STATE = {
    posts: null,
    post: null,
    loading: false,
    error: null,
};

const Post = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LIST_POST:
            return { ...state, loading: true };
        case GET_LIST_POST_SUCCESS:
            return { ...state, posts: action.payload, loading: false, error: null };
        case POST_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Post;
