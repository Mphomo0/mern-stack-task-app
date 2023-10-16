import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';

// Create a Redux store with the following configuration.
const store = configureStore({
  // Define reducers for the store, including the API slice and the 'auth' slice.
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // API slice reducer using the provided path.
    auth: authReducer, // 'auth' slice reducer.
  },
  // Add middleware, including the API slice middleware.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // Enable Redux DevTools for development (set to 'true').
  devTools: true,
});

export default store; // Export the configured Redux store.
