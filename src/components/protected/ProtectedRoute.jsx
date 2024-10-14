import React from "react";
import Cookie from "js-cookie";
import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const ProtectedRoute = ({ children }) => {
  const access_token = Cookie.get("mrcs_cookie");

  return access_token ? (
    <MainLayout>{children}</MainLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
