import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // 1. Check if the user is authenticated (from your state, context, or localStorage)
  const isAuthenticated = localStorage.getItem("token"); 

  // 2. Conditional Logic
  // If logged in, render the child routes (<Outlet />).
  // If not logged in, redirect them immediately to the login page.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
