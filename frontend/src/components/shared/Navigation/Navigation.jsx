import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { logout } from "../../../http/index";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import { useSelector } from "react-redux";

const Navigation = () => {
  // eslint-disable-next-line no-unused-vars
  const { isAuth, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  async function logoutHandle() {
    try {
      const { data } = await logout();
      console.log(data);
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <nav className={`${styles.navbar} containe=`}>
      <Link to={"/"}>
        <img className={styles.logo} src="/images/logo.png" alt="logo" />
      </Link>
      {
        isAuth && <div className={styles.navRight}>
        <h3>{user?.name}</h3>
        <Link to="/">
          <img className={styles.profile} src={user.avatar? user.avatar : 'images/monkey-avatar.png' } width="40" height="40" alt="Avatar" />
        </Link>
          <button className={styles.logoutBtn} onClick={logoutHandle}><img src="/images/logout.png" alt="" /></button>
      </div>
      }
      {/* { isAuth && <button onClick={logoutHandle}>Logout</button>} */}
    </nav>
  );
};

export default Navigation;
