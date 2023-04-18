import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { logOutAdmin, logout } from "../../../http/index";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import { useSelector } from "react-redux";
import { Box, Button } from "@chakra-ui/react";

const Navigation = () => {
  // eslint-disable-next-line no-unused-vars
  const { isAuth, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const logOutHandler = async () => {
    const { data } = await logOutAdmin();
    console.log(data);
    dispatch(setAuth(data));
  };
  return (
    <nav className={`${styles.navbar} containe=`}>
      <Link to={"/"}>
        <img className={styles.logo} src="/images/logo.png" alt="logo" />
      </Link>
  <Box fontWeight="bold" fontSize="30px">ADMIN DASHBOARD</Box>
      {
        <div className={styles.navRight}>
          <Button onClick={logOutHandler}>Logout</Button>
        </div>
      }
    </nav>
  );
};

export default Navigation;
