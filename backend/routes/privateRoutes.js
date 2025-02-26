import React from "react";
import { Navigate } from "react-router-dom";

const privateRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? children : <Navigate to="/login" />;
};

export default privateRoutes;