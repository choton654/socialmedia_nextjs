import {
  ADD_COMMENT,
  ADD_POST,
  CLEAR_ERROR,
  DELETE_COMMENTS,
  DELETE_POSTS,
  ERRORS,
  LIKE_UNLIKE_POST,
  LOADING,
  LOADING_DATA,
  SET_POST,
  SET_POSTS,
} from '../types';

export default function dataReducers(state, action) {
  switch (action.type) {
    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case LIKE_UNLIKE_POST:
      let index = state.posts.findIndex(
        (post) => post._id === action.payload._id,
      );
      state.posts[index].likes = action.payload.likes;
      if (state.post._id === action.payload._id) {
        state.post.likes = action.payload.likes;
      }
      return {
        ...state,
      };
    case DELETE_POSTS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case ADD_COMMENT: {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? { ...post, comments: (post.comments += 1) }
            : post,
        ),
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      };
    }
    case DELETE_COMMENTS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? { ...post, comments: (post.comments -= 1) }
            : post,
        ),
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== action.payload._id,
          ),
        },
      };
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ERRORS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
}
