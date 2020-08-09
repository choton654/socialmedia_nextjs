import Axios from 'axios';
import cookie from 'js-cookie';
import router from 'next/router';
import { createContext, useContext, useReducer } from 'react';
import userReducers from '../reducers/userReducers';
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

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const initialState = {
    authenticated: false,
    loading: false,
    error: null,
    credential: {},
    likes: [],
    notifications: [],
  };

  const [state, dispatch] = useReducer(userReducers, initialState);

  const logInUser = async (userData) => {
    dispatch({ type: LOADING_UI });

    try {
      const res = await Axios.post('/api/v1/auth/login', userData);

      cookie.set('token', res.data);
      // Axios.defaults.headers.common['Authorization'] = res.data;
      dispatch({ type: SET_AUTHENTICATED });
      dispatch({ type: CLEAR_ERRORS });
      router.push('/');
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
      console.error(error);
    }
  };

  const signUpUser = async (userData) => {
    dispatch({ type: LOADING_UI });

    try {
      const res = await Axios.post('/api/v1/auth/signup', userData);

      console.log(res.data);
      cookie.set('token', res.data);
      // Axios.defaults.headers.common['Authorization'] = res.data;
      dispatch({ type: SET_AUTHENTICATED });
      dispatch({ type: CLEAR_ERRORS });
      router.push('/');
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
      console.error(error);
    }
  };

  const logOutUser = () => {
    cookie.remove('token');
    // delete Axios.defaults.headers.common['Authorization'];
    window.localStorage.setItem('logout', Date.now());
    dispatch({ type: SET_UNAUTHENTICATED });
    router.push('/login');
  };

  const uploadImage = async (formData) => {
    dispatch({ type: LOADING_USER });
    try {
      const token = cookie.get('token');
      const res = await Axios.put('/api/v1/user/image', formData, {
        headers: { Authorization: token },
      });
      dispatch({ type: SET_CURRENT_USER, payload: res.data.data });
      // router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const editUserDetails = async (userDetails) => {
    dispatch({ type: LOADING_USER });
    try {
      const token = cookie.get('token');
      const res = await Axios.put('/api/v1/user', userDetails, {
        headers: { Authorization: token },
      });
      dispatch({ type: SET_CURRENT_USER, payload: res.data.data });
    } catch (error) {
      console.error(error);
    }
  };

  const loadUser = (user) => {
    dispatch({ type: SET_USER, payload: user });
  };

  const getUserData = async () => {
    dispatch({ type: LOADING_USER });
    try {
      const token = cookie.get('token');
      const res = await Axios.get('/api/v1/user', {
        headers: { Authorization: token },
      });
      dispatch({ type: SET_USER, payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <UserContext.Provider
      value={{
        state,
        loadUser,
        logInUser,
        signUpUser,
        logOutUser,
        getUserData,
        uploadImage,
        editUserDetails,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => useContext(UserContext);
