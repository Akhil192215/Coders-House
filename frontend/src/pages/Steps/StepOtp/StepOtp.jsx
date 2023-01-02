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

const StepOtp = ({ navFuction }) => {
  const {phone,hash} = useSelector((state)=>state.auth.otp)
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch()
  const submit = async () => {
    try {
      const { data } = await verifyOtp({otp,phone,hash});
      console.log(data);
      dispatch(setAuth(data))
    } catch (err) {
      console.log(err);
    }
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
          <p className={styles.bottomParagraph}>
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
