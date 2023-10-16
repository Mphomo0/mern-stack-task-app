import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the 'auth' slice.
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null, // Load user info from local storage if available, or set it to null.
};

// Create the 'authSlice' using createSlice.
const authSlice = createSlice({
  name: 'auth', // Name of the slice.
  initialState, // Use the defined initial state.
  reducers: {
    // Define reducer functions.
    setCredentials: (state, action) => {
      state.userInfo = action.payload; // Set user info in the state.
      localStorage.setItem('userInfo', JSON.stringify(action.payload)); // Store user info in local storage.
    },
    logout: (state, action) => {
      state.userInfo = null; // Clear user info in the state.
      localStorage.removeItem('userInfo'); // Remove user info from local storage.
    },
  },
});

// Export the action creators.
export const { setCredentials, logout } = authSlice.actions;

// Export the reducer.
export default authSlice.reducer;
