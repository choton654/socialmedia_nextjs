import {
  CLEAR_ERRORS,
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
    default:
      return state;
  }
}
