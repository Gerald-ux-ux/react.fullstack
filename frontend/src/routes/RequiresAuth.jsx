import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts";

const RequiresAuth = () => {
  const loaction = useLocation();
  const { token } = useAuthContext();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default RequiresAuth;
