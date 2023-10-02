import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const AuthRoutes = ({ element, role }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.user.role);

  // Check if the user is authenticated and has the required role
  if (!isAuthenticated || userRole !== role) {
    return <Navigate to="/login" />;
  }

  // Render the route component if the user is authenticated with the required role
  return element;
};

export default AuthRoutes;
