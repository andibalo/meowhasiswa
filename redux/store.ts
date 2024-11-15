import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import authReducer from './slice/auth'
import { threadsApi } from './api/thread';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [threadsApi.reducerPath]: threadsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(threadsApi.middleware)
    },
    devTools: false,
    // @ts-ignore
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devToolsEnhancer()),
})


setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
