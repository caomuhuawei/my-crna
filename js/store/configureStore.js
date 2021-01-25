'use strict';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {ensureCompatibility} from './compatibility';

const isDebuggingInChrome = false;
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const createCStore = applyMiddleware(thunk, logger)(createStore);
let store;
let persistor;
export default async () => {
  await ensureCompatibility();
  store = createCStore(persistedReducer);
  persistor = persistStore(store);

  if (isDebuggingInChrome) {
    window.store = store;
  }
  return {store, persistor};
};
export {store};
