import { LIKE_UNLIKE_POST, LOADING_DATA, SET_POSTS } from '../types';

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

    default:
      return state;
  }
}
