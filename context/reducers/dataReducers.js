import {
  ADD_POST,
  CLEAR_ERROR,
  DELETE_POSTS,
  ERRORS,
  LIKE_UNLIKE_POST,
  LOADING,
  LOADING_DATA,
  SET_POSTS,
} from '../types';

export default function dataReducers(state, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
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
