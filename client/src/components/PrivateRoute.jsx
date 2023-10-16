import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth); // Use Redux's useSelector to access user information from the auth state.
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />; // If user info is available, allow access to nested routes. If not, navigate to the login page.
};

export default PrivateRoute; // Export the PrivateRoute component.
