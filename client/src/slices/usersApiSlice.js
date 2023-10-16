import { apiSlice } from "./apiSlice";

const USERS_URL = '/api/users'

// Create a user API slice by injecting endpoints into the 'apiSlice'.
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Define API endpoints for user-related operations.
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`, // Login endpoint URL.
                method: 'POST', // HTTP method for login request.
                body: data, // Request data for login.
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`, // Register endpoint URL.
                method: 'POST', // HTTP method for registration request.
                body: data, // Request data for registration.
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`, // Logout endpoint URL.
                method: 'POST', // HTTP method for logout request.
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`, // Update user profile endpoint URL.
                method: 'PUT', // HTTP method for updating user profile.
                body: data, // Request data for profile update.
            }),
        }),
    })
})

// Export mutation hooks for the defined API endpoints.
export const { 
    useLoginMutation, // Hook for the login mutation.
    useRegisterMutation, // Hook for the registration mutation.
    useLogoutMutation, // Hook for the logout mutation.
    useUpdateUserMutation // Hook for updating user profile.
 } = userApiSlice;
