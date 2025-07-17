// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Please login or create an account to access the Todo list.");
    }
  }, [token]);

  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
