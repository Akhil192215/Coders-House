import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const GuestRoutes = () => {
  // let auth = false;
  const {isAuth} = useSelector((state)=> state.auth)
  return isAuth ? <Navigate to="/rooms" /> : <Outlet />;
};

export default GuestRoutes;
