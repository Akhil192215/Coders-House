import React from "react";
import styles from "./AddRoomModal.module.css";
import InputField from "../Input/InputField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom as create } from "../../../http/index";

const AddRoomModal = ({ onClose }) => {
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();
  const createRoom = async () => {
    if (!topic) return "";
    try {
      const { data } = await create({ topic, roomType });
      console.log(data);
      navigate(`/room/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBoday}>
        <button onClick={onClose} className={styles.closeBtn}>
          <img src="images/close.png" alt="" />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be disscussed</h3>
          <InputField
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            fullWidth={"true"}
          />
          <h2 className={styles.subHeading}>Room types</h2>
          <div className={styles.roomTypes}>
            <div
              onClick={() => setRoomType("open")}
              className={`${styles.typeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
            >
              <img className={styles.code} src="/images/mic1.png" alt="globe" />
              <span>Audio</span>
            </div>
            {/* <div
              onClick={() => setRoomType("social")}
              className={`${styles.typeBox} ${
                roomType === "social" ? styles.active : ""
              }`}
            >
              <img src="/images/social.png" alt="globe" />
              <span>Social</span>
            </div> */}
            <div
              onClick={() => setRoomType("private")}
              className={`${styles.typeBox} ${
                roomType === "private" ? styles.active : ""
              }`}
            >
              <img className={styles.code} src="/images/code.png" alt="globe" />
              <span>Coding</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room, open to everyone</h2>
          <button onClick={createRoom} className={styles.footerBtn}>
            <img src="/images/celebration.png" alt="" />
            <span> Let's go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
