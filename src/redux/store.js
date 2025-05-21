import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // keep this import
import userReducer from './reducers/userReducer';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // important when using redux-persist
    }).concat(thunk),
});

export const persistor = persistStore(store);

