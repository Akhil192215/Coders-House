import React from "react";
import styles from "./AddRoomModal.module.css";
import InputField from "../Input/InputField";
import { useState } from "react";

const AddRoomModal = ({ onClose }) => {
  const [roomType, setRoomType] = useState("open");
  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBoday}>
        <button onClick={onClose} className={styles.closeBtn}>
          <img src="images/close.png" alt="" />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be disscussed</h3>
          <InputField fullWidth={"true"} />
          <h2 className={styles.subHeading}>Room types</h2>
          <div className={styles.roomTypes}>
            <div
              onClick={() => setRoomType("open")}
              className={`${styles.typeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
            >
              <img src="/images/globe.png" alt="globe" />
              <span>Open</span>
            </div>
            <div
              onClick={() => setRoomType("social")}
              className={`${styles.typeBox} ${
                roomType === "social" ? styles.active : ""
              }`}
            >
              <img src="/images/social.png" alt="globe" />
              <span>Social</span>
            </div>
            <div
              onClick={() => setRoomType("private")}
              className={`${styles.typeBox} ${
                roomType === "private" ? styles.active : ""
              }`}
            >
              <img src="/images/lock.png" alt="globe" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room, open to everyone</h2>
          <button className={styles.footerBtn}>
            <img src="/images/celebration.png" alt="" />
            <span> Let's go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
