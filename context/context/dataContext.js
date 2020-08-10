import Axios from 'axios';
import cookie from 'js-cookie';
import { createContext, useContext, useReducer } from 'react';
import dataReducers from '../reducers/dataReducers';
import {
  ADD_POST,
  CLEAR_ERROR,
  DELETE_POSTS,
  ERRORS,
  LIKE_UNLIKE_POST,
  LOADING,
  SET_POSTS,
} from '../types';

const DataContext = createContext();

// eslint-disable-next-line react/prop-types
export const DataProvider = ({ children }) => {
  const initialState = {
    posts: [],
    post: {},
    loading: false,
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(dataReducers, initialState);

  const loadPosts = (posts) => {
    dispatch({ type: SET_POSTS, payload: posts });
  };

  const deletePost = async (id) => {
    try {
      const token = cookie.get('token');
      await Axios.delete(`/api/v1/post/${id}`, {
        headers: { Authorization: token },
      });
      dispatch({ type: DELETE_POSTS, payload: id });
    } catch (error) {
      console.error(error);
    }
  };

  const addPost = async (newPost) => {
    dispatch({ type: LOADING });

    try {
      const token = cookie.get('token');
      const { data } = await Axios.post('/api/v1/post', newPost, {
        headers: { Authorization: token },
      });
      dispatch({ type: ADD_POST, payload: data });

      dispatch({ type: CLEAR_ERROR });
    } catch (error) {
      console.error(error.response.data);
      dispatch({ type: ERRORS, payload: error.response.data });
    }
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
        deletePost,
        addPost,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export const DataState = () => useContext(DataContext);
