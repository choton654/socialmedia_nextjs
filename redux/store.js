import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import dataReducers from './reducers/dataReducers';
import uiReducers from './reducers/uiReducers';
import userReducers from './reducers/userReducers';

const rootreducers = combineReducers({
  user: userReducers,
  data: dataReducers,
  UI: uiReducers,
});

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const initStore = () => {
  return createStore(rootreducers, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
