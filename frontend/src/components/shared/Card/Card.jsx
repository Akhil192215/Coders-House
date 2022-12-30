import React from 'react'
import styles from './Card.module.css'
const Card = (ttitle) => {
  return (
    <div>
         <div className={styles.card}>
      <div className={styles.headingWrapper}>
        <img src="/images/logo.png" alt="" />
      </div>
    </div>
    </div>
  )
}

export default Card