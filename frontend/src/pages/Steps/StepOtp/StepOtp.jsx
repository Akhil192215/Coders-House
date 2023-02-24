import React from "react";
import { useState } from "react";
import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import InputField from "../../../components/shared/Input/InputField";
import styles from "./StepOtp.module.css";
import { verifyOtp } from "../../../http";
import { useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import { warn } from "../../../components/shared/Alert/Alert";
import { ToastContainer } from "react-toastify";
import { sendOtp } from "../../../http/index"


const StepOtp = ({ navFuction }) => {
  const { phone, hash } = useSelector((state) => state.auth.otp);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const submit = async () => {
    if (!otp) {
      return warn("OTP is required");
    }
    try {
      const { data } = await verifyOtp({ otp, phone, hash });
      if (data.message === "OTP is invalid") {
        return warn("OTP is invalid");
      }
      if (data.message === "otp is expired") {
        return warn("OTP is expird ");
      }

      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  };
  console.log(phone);
  const resendOtp = async () => {
    console.log('in here',phone);
  const {data} = await sendOtp({phoneNumber:phone})
  console.log(data);
  };
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title={"Enter the code we just texted you"} icon={"lock-emoji"}>
          <div>
            <InputField value={otp} onChange={(e) => setOtp(e.target.value)} />
          </div>
          <div className={styles.actionButton}>
            <Button onClick={submit} text={"Verify"} />
          </div>  
          <br />
          <p onClick={resendOtp}>resend otp?</p>
          <p className={styles.bottomParagraph}>
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
      <ToastContainer />
    </>
  );
};

export default StepOtp;
