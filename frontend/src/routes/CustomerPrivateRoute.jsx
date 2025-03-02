import React from "react";
import { Navigate } from "react-router-dom";

const CustomerPrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("role"));

  return user === "user" ? children : <Navigate to="/login" />;
};

export default CustomerPrivateRoute;