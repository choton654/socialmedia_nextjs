import Axios from 'axios';
import cookie from 'js-cookie';
import { createContext, useContext, useReducer } from 'react';
import dataReducers from '../reducers/dataReducers';
import { LIKE_UNLIKE_POST, SET_POSTS } from '../types';

const DataContext = createContext();

// eslint-disable-next-line react/prop-types
export const DataProvider = ({ children }) => {
  const initialState = {
    posts: [],
    post: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(dataReducers, initialState);

  const loadPosts = (posts) => {
    dispatch({ type: SET_POSTS, payload: posts });
  };

  const likeUnlikePosts = async (postId) => {
    try {
      const token = cookie.get('token');

      const { data } = await Axios.put(
        `/api/v1/post/${postId}/like-unlike`,
        null,
        {
          headers: { Authorization: token },
        },
      );
      dispatch({ type: LIKE_UNLIKE_POST, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <DataContext.Provider
      value={{
        state,
        likeUnlikePosts,
        loadPosts,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export const DataState = () => useContext(DataContext);
