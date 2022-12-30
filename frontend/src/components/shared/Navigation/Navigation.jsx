import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.css'
const Navigation = () => {
    return (
        <nav className={`${styles.navbar} containe=`}>

            <Link to={"/"}>
                <img src="/images/logo.png" alt="logo" />
               
            </Link>

        </nav>
    )
}

export default Navigation