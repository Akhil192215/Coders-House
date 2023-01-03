import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const SemiProtected = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  return !isAuth ? (
    <Navigate to="/" />
  ) : isAuth && !user.activated ? (
    <Outlet />
  ) : (
    <Navigate to="/rooms" />
  );
};

export default SemiProtected;
