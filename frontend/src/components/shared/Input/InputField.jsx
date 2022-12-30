import React from 'react'
import styles from './inputField.module.css'
const InputField = (props,{children}) => {
  return (
    <input className={styles.input} type="text"  />
  )
}

export default InputField