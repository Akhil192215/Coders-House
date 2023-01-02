import React from "react";
import { useState } from "react";

import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import InputField from "../../../components/shared/Input/InputField";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activateSlice";
import styles from "./StepName.module.css";

const StepOtp = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate);
  const [fullName, setFullName] = useState(name);
  const dispatch = useDispatch();
  const nextStep = () => {
    if (!fullName) {
      return;
    }
    dispatch(setName(fullName));
    onNext();
  };
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title={"What’s your full name?"} icon={"goggle-emoji"}>
          <div>
            <InputField
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className={styles.actionButton}>
            <Button onClick={nextStep} text={"Verify"} />
          </div>
          <p className={styles.paragraph}>
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
