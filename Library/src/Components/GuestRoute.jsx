import { Navigate, Outlet } from "react-router-dom";

function GuestRoute({ authUser, authLoading }) {
  if (authLoading) return null;
  if (authUser) return <Navigate to="/books" replace />;
  return <Outlet />;
}

export default GuestRoute;