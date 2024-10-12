import React from "react";
import Cookie from "js-cookie";
import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const access_token = Cookie.get("mrcs_cookie");

  return token ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" />;
};

export default ProtectedRoute;
