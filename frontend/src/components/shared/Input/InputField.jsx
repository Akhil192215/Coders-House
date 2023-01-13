import React from "react";
import styles from "./inputField.module.css";
const InputField = (props) => {
  return (
    <input
      className={styles.input}
      style={{ width: props.fullWidth === "true" ? "100%" : "inherit" }}
      type={props.text}
      {...props}
    />
  );
};

export default InputField;
