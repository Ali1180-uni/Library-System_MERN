// ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ requiredRole }) {
  const [auth, setAuth] = useState(null); // null = loading

  useEffect(() => {
    axios.get("http://localhost:3000/books/auth-check", { withCredentials: true })
      .then(response => setAuth(response.data))
      .catch(() => setAuth({ IsAuthenticated: false }));
  }, []);

  if (auth === null) return <p>Loading...</p>;
  if (!auth.IsAuthenticated) return <Navigate to="/login" replace />;
  if (requiredRole && auth.Role !== requiredRole) return <Navigate to="/books" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
