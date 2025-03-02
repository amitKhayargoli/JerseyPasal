import React from "react";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("role"));

  return user === "admin" ? children : <Navigate to="/login" />;
};

export default AdminPrivateRoute;