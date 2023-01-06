import React from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import { useSelector } from "react-redux";
import styles from "./StepAvatar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import { activate } from "../../../http/index";
import {setAuth} from "../../../store/authSlice"

const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState("/images/monkey-avatar.png");
  const { name, avatar } = useSelector((state) => state.activate);
  function captureAvatar(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      // console.log(reader.result);
      setProfile(reader.result);
      dispatch(setAvatar(reader.result));
    };
  }
  async function submit() {
    if(!name || !avatar) return;
    try {
      const { data } = await activate({name:name, avatar:avatar});
      dispatch(setAuth(data))
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="cardWrapper">
        <Card title={`Okay, ${name}!`} icon={"monkey-emoji"}>
          <p className={styles.subHeading}>How's this photo?</p>
          <div>
            <div className={styles.avatarWrapper}>
              <img className="avatarImg" src={profile} alt="img" />
            </div>
            <div>
              <input
                type="file"
                id="avatarInput"
                onChange={captureAvatar}
                className={styles.avatarInput}
              />
              <label className={styles.avatarLabel} htmlFor="avatarInput">
                Choose a differnt photo
              </label>
            </div>
            <Button onClick={submit} text={"Verify"} />
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepAvatar;
