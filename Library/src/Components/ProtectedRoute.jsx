// ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({ requiredRole }) {
  const [auth, setAuth] = useState(null); // null = loading

  useEffect(() => {
    fetch("http://localhost:3000/books/auth-check", { credentials: "include" })
      .then(r => r.json())
      .then(data => setAuth(data))
      .catch(() => setAuth({ IsAuthenticated: false }));
  }, []);

  if (auth === null) return <p>Loading...</p>;
  if (!auth.IsAuthenticated) return <Navigate to="/login" replace />;
  if (requiredRole && auth.Role !== requiredRole) return <Navigate to="/books" replace />;

  return <Outlet />;
}

export default ProtectedRoute;