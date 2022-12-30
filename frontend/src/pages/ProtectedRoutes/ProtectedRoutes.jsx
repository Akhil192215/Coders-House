import React from "react";
import { Navigate, Outlet } from "react-router-dom";
let auth = false;
let user = {
  activate: false,
};

const ProtectedRoutes = () => {
  return !auth ? (
    <Navigate to="/" />
  ) : auth && !user.activate ? (
    <Navigate to="/new" />
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
