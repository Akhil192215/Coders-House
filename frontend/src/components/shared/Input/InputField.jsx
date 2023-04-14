import React from "react";
import styles from "./inputField.module.css";
const InputField = (props) => {
  return (
    <input
      style={{ height: "40px" }}
      type={props.text}
      className={styles.input}
      placeholder={props.placeholder}
      {...props}
    />
  );
};

export default InputField;
