import {
  CLEAR_ERRORS,
  LIKE_UNLIKE_POST,
  LOADING_UI,
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_CURRENT_USER,
  SET_ERRORS,
  SET_UNAUTHENTICATED,
  SET_USER,
} from '../types';

export default function userReducers(state, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false,
        loading: false,
      };
    case SET_USER:
      return {
        ...state,
        ...action.payload,
        loading: false,
        authenticated: true,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        credential: action.payload,
        loading: false,
        authenticated: true,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case LIKE_UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.map((l) =>
          l.postId === action.payload._id
            ? null
            : { postId: action.payload._id, user: action.payload.user },
        ),
      };
    // return {
    //   ...state,
    //   likes: [
    //     ...state.likes,
    //     {
    //       user: state.credential._id,
    //       postId: action.payload._id,
    //     },
    //   ],
    // };
    default:
      return state;
  }
}
