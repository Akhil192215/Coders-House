import React from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import { useSelector } from "react-redux";
import styles from "./StepAvatar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import { activate } from "../../../http/index";
import { setAuth } from "../../../store/authSlice";
import Loader from "../../../components/shared/Loader/Loader";
import { warn } from "../../../components/shared/Alert/Alert";
import { ToastContainer } from "react-toastify";

const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState("/images/monkey-avatar.png");
  const { name, avatar } = useSelector((state) => state.activate);
  const [loading, setLoading] = useState(false);
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
   
    if (!avatar) {
      console.log("hi there ");
      return warn("Please choose a profile picture");
    }else{
      setLoading(true);
      try {
        const { data } = await activate({ name: name, avatar: avatar });
        dispatch(setAuth(data));
        console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }
  if (loading) return <Loader message={"Activation in progress . . ."} />;
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
      <ToastContainer />
    </>
  );
};

export default StepAvatar;
