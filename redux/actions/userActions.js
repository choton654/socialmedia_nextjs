import Axios from 'axios';
import cookie from 'js-cookie';
import router from 'next/router';
import {
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  SET_ERRORS,
  SET_UNAUTHENTICATED,
  SET_USER,
} from '../types';

export const logInUser = (userData) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    const res = await Axios.post('/api/v1/auth/login', userData);

    console.log(res.data);
    cookie.set('token', res.data);
    Axios.defaults.headers.common['Authorization'] = res.data;
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    router.push('/');
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
    console.error(error);
  }
};

export const signUpUser = (userData) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    const res = await Axios.post('/api/v1/auth/signup', userData);

    console.log(res.data);
    cookie.set('token', res.data);
    Axios.defaults.headers.common['Authorization'] = res.data;
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    router.push('/');
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
    console.error(error);
  }
};

export const logOutUser = () => (dispatch) => {
  cookie.remove('token');
  delete Axios.defaults.headers.common['Authorization'];
  window.localStorage.setItem('logout', Date.now());
  dispatch({ type: SET_UNAUTHENTICATED });
  router.push('/login');
};

export const getUserData = () => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    const res = await Axios.get('/api/v1/user');
    dispatch({ type: SET_USER, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};
