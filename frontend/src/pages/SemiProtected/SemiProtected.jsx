import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const SemiProtected = () => {
  let auth = false;
  let user = {
    activate: false,
  };
  return !auth ? (
    <Navigate to="/" />
  ) : auth && !user.activate ? (
    <Outlet />
  ) : (
    <Navigate to="/rooms" />
  );
};

export default SemiProtected;
