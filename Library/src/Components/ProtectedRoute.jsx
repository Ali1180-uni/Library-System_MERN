import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({ authUser, authLoading, requiredRole }) {
  if (authLoading) return null;
  if (!authUser) return <Navigate to="/login" replace />;
  if (requiredRole && authUser.role !== requiredRole) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default ProtectedRoute;