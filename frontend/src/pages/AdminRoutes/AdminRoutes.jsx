import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
  const { isAuth } = useSelector((state) => state.adminAuth);
  return !isAuth ? (
    <Navigate to="/" />
  )  : (
    <Outlet />
  );

};

export default AdminRoutes;
