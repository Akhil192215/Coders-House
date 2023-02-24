import React from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import InputField from "../../../../components/shared/Input/InputField";
import styles from "../StepPhoneEmail.module.css";
import { sendOtp } from "../../../../http/index";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OTPsend, warn } from "../../../../components/shared/Alert/Alert";
var pattern = new RegExp(/^\+?[6-9][0-9]{9,11}$/);
// var pattern = new RegExp(/\d\d\d\d\d\d\d\d\d\d$/);
const Phone = ({ onNext }) => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  async function submit() {
    console.log(pattern.test(phoneNumber));
    if (!pattern.test(phoneNumber)) {
      return warn('Please provide a valid phone number');
    } else {
      const { data } = await sendOtp({ phoneNumber });
      if (data) {
        console.log(data);
        dispatch(setOtp({ phone: data.phoneNumber, hash: data.hash }));
        await OTPsend();
        setTimeout(() => {
          onNext();
        }, 1000);
      }
    }
  }

  return (
    <>
      <Card title={"Enter your Phone number"} icon={"phone"}>
        <div>
          <InputField
            value={phoneNumber}
            text={"number"}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className={styles.actionButton}>
          <Button text={"Next"} onClick={submit} />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </Card>
      <ToastContainer />
    </>
  );
};

export default Phone;
