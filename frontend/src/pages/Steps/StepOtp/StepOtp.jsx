import React from "react";
import { useState } from "react";
import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import InputField from "../../../components/shared/Input/InputField";
import styles from "./StepOtp.module.css";
const StepOtp = ({ navFuction }) => {
  const [otp, setOtp] = useState("");
  const next = () => {

  };
  return (
    <>

      <div className={styles.cardWrapper}>
        <Card title={"Enter the code we just texted you"} icon={"lock-emoji"}>
          <div>
            <InputField value={otp} onChange={(e) => setOtp(e.target.value)} />
          </div>
          <div className={styles.actionButton}>
            <Button onClick={next} text={"Next"} />
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
