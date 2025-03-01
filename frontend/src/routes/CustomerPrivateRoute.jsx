import React from "react";
import { Navigate } from "react-router-dom";

const CustomerPrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user && user.role === "customer" ? children : <Navigate to="/login" />;
};

export default CustomerPrivateRoute;