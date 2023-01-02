import React from 'react'
import styles from './inputField.module.css'
const InputField = (props) => {
  return (
    <input className={styles.input} type="text" {...props} />
  )
}

export default InputField