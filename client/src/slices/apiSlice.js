import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// Create a base query with a base URL (You should provide the actual base URL).
const baseQuery = fetchBaseQuery({ baseUrl: '' });

// Create an API slice with options.
export const apiSlice = createApi({
  baseQuery, // Use the previously defined base query.
  tagTypes: ['User'], // Define tag types for caching and invalidation.
  endpoints: (builder) => ({ 
    // Define your API endpoints here if you have any. 
  }),
});
