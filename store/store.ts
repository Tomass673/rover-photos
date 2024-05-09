import { configureStore } from '@reduxjs/toolkit'
import {api} from "@/store/services/api";
export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            api.middleware
        ),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)
export type AppDispatch = typeof store.dispatch;
export type TypeRootState = ReturnType<typeof store.getState>
