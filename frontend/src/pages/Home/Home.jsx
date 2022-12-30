import React from 'react'
import styles from './Home.module.css'
import { Link ,useNavigate} from 'react-router-dom'
import Button from '../../components/shared/Button/Button'
function Home() {
  const signInLinkStyle = {
    color: '#EA3C12',
    fontWeight: 'bold',
    textDecoration: 'none',
    fontSize: '13px',
    marginLeft: '10px'
  }
const navigate = useNavigate()
  const startRegister = () => {
    navigate('/register')
  }

  return (
    <div className={styles.cardWrapper}>

      <div className={styles.card}>
        <div className={styles.headingWrapper}>
          <img src="/images/logo.png" alt="" />
        </div>
        <div>
          <Button onClick={startRegister} text={'Get you username'} />
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.invite}>Have an invite text? </span>
          <Link to="authenticate" style={signInLinkStyle}>Sign in</Link>
        </div>
      </div>
    </div>


  )
}

export default Home