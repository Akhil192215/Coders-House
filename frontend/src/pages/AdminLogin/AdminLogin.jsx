import React from "react";
import Card from "../../../src/components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";
import InputField from "../../components/shared/Input/InputField";
import styles from "./AdminLogin.moudle.css";
// import { sendOtp } from "../../../../http/index";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { setOtp } from "../../../../store/authSlice";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OTPsend, warn } from "../../components/shared/Alert/Alert";
import { Flex } from "@chakra-ui/react";
import { adminLogin, sendOtp } from "../../http";
import { useNavigate } from "react-router-dom";
import { setAuthAdmin } from "../../store/adminSlice";
const emailRegex = /^\S+@\S+\.\S+$/;
// var pattern = new RegExp(/\d\d\d\d\d\d\d\d\d\d$/);
const AdminLogin = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function submit() {
    if (!emailRegex.test(email)) {
      return warn("Please provide a valid phone number");
    } else {
      try {
        const data = await adminLogin({ email, password });
        if (data.data.message === "verified") {
          nav("/dashboard");
          dispatch(setAuthAdmin(data.data));
        }
      } catch (error) {
        warn("invalid credentials");
      }
    }
  }

  return (
    <>
      <Flex justifyContent="center" alignItems="center" height="70vh">
        <Card title={"Admin Login"}>
          <div>
            <InputField
              placeholder="Enter email"
              value={email}
              text={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <br />
            <InputField
              placeholder="Enter password"
              value={password}
              text={"text"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <div className={styles.actionButton}>
            <Button text={"Login"} onClick={submit} />
          </div>
          <br />
          <p className={styles.bottomParagraph}></p>
        </Card>
      </Flex>
      <ToastContainer />
    </>
  );
};

export default AdminLogin;
