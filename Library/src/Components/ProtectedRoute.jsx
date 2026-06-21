import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ requiredRole }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/books/auth-check", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setIsAuthenticated(data.IsAuthenticated);
        setUserRole(data.Role || null);
      } catch {
        setIsAuthenticated(false);
      }
    };

    verifyAuth();
  }, []);
if (isAuthenticated === null) {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p className="loader-text">Verifying session...</p>
    </div>
  );
}
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/books" replace />;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
