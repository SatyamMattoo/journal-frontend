import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Check if the user is authenticated and has the required role
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  // Render the route component if the user is authenticated with the required role
  return element;
};

export default ProtectedRoute;
