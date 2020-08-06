import { CLEAR_ERRORS, LOADING_UI, SET_ERRORS } from '../types';

const initialState = {
  loading: false,
  error: null,
};

export default function uiReducers(state = initialState, action) {
  switch (action.type) {
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
