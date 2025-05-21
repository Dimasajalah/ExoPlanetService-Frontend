import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { modelsLabApi } from './api/models-lab'
import hostReducer from './hostSlice'
import quizReducer from './quizSlice'

export const store = configureStore({
    reducer: {
        [modelsLabApi.reducerPath]: modelsLabApi.reducer,
        host: hostReducer,
        quiz: quizReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(modelsLabApi.middleware),
})

setupListeners(store.dispatch)