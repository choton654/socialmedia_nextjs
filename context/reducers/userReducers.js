import {
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  MARK_NOTIFICATIONS,
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
        error: null,
        credential: {},
        likes: [],
        notifications: [],
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
        credential: action.payload.data,
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
    // case LIKE_UNLIKE_POST:
    //   return {
    //     ...state,
    //     likes: [
    //       ...state.likes,
    //       { postId: action.payload._id, user: action.payload.user },
    //     ],
    //   };
    case MARK_NOTIFICATIONS:
      state.notifications.filter((not) => not.read === true);
      return {
        ...state,
      };
    default:
      return state;
  }
}
