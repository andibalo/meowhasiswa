import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import authReducer from './slice/auth'
import { threadsApi, userApi, universityApi, subThreadsApi, imageApi } from './api';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [threadsApi.reducerPath]: threadsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [universityApi.reducerPath]: universityApi.reducer,
        [subThreadsApi.reducerPath]: subThreadsApi.reducer,
        [imageApi.reducerPath]: imageApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().
            concat(threadsApi.middleware).
            concat(userApi.middleware).
            concat(universityApi.middleware).
            concat(subThreadsApi.middleware).
            concat(imageApi.middleware)
    },
    devTools: false,
    // @ts-ignore
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devToolsEnhancer()),
})


setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
