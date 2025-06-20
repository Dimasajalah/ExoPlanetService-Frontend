// store.js
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { modelsLabApi } from './api/models-lab'
import hostReducer from './hostSlice'
import quizReducer from './quizSlice'

import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from 'redux'

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['host', 'quiz'], // only persist these slices
}

// Combine your reducers
const rootReducer = combineReducers({
  [modelsLabApi.reducerPath]: modelsLabApi.reducer,
  host: hostReducer,
  quiz: quizReducer,
})

// Create a persisted reducer
const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // important for redux-persist actions
    }).concat(modelsLabApi.middleware),
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)
