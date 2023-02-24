import React from "react";
import styles from "./inputField.module.css";
const InputField = (props) => {
  return (
    <input
      type={props.text}
      className={styles.input}
      style={{ width: props.fullWidth === "true" ? "100%" : "inherit" }}
      {...props}
    />
  );
};

export default InputField;
