import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

import userReducer from './user/userSlice';
import cartReducer from './reducers/cartReducer';

// KeplerConfirmed reducers
import hostReducer from '../KeplerConfirmed/src/state/hostSlice';
import quizReducer from '../KeplerConfirmed/src/state/quizSlice';
import { modelsLabApi } from '../KeplerConfirmed/src/state/api/models-lab';

// 1. Gabungkan semua reducer
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  host: hostReducer,
  quiz: quizReducer,
  [modelsLabApi.reducerPath]: modelsLabApi.reducer,
});

// 2. Konfigurasi persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart', 'quiz', 'host'],
};

// 3. Bungkus rootReducer dengan persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Buat store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(modelsLabApi.middleware),
});

// 5. Buat persistor (setelah store)
export const persistor = persistStore(store);

