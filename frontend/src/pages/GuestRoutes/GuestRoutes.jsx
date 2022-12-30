import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const GuestRoutes = () => {
  let auth = false;
  return auth.token ? <Navigate to="/room" /> : <Outlet />;
};

export default GuestRoutes;
