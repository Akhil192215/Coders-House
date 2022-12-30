import React from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import InputField from "../../../../components/shared/Input/InputField";
import styles from "../StepPhoneEmail.module.css";
const Phone = ({onNext}) => {
  return (
    <>
      <Card title={"Enter your Phone number"} icon={"phone"}>
        <div>
          <InputField  />
        </div>
        <div className={styles.actionButton}>
          <Button text={"Next"} onClick={onNext} />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </Card>
    </>
  );
};

export default Phone;
