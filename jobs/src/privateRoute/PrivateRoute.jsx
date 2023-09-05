import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return user ? children : <Navigate to="/"></Navigate>;
};

export default PrivateRoute;
