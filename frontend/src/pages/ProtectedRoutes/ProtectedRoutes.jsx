import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  return !isAuth ? (
    <Navigate to="/" />
  ) : isAuth && !user.activated ? (
    <Navigate to="/activate" />
  ) : (
    <Outlet />
  );
  // if(!auth) return <Navigate to='/' />
  // if(auth && !user.activate ){
  //      return  <Navigate to='/new' />
  // }else{
  //     return <Outlet/>
  // }
};

export default ProtectedRoutes;
