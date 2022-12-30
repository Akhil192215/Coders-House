import React from 'react'
// import styles from './Register.module.css'
import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail'
import StepOtp from '../Steps/StepOtp/StepOtp'
import StepName from '../Steps/StepName/StepName'
import StepAvatar from '../Steps/StepAvatar/StepAvatar'
import SepUsername from '../Steps/StepUsername/StepUsername'
import { useState } from 'react'

const steps = {
    1: StepPhoneEmail,
    2: StepOtp,
    3: StepName,
    4: StepAvatar,
    5: SepUsername
}


const Register = () => {
    const [step, setStep] = useState(1);
    const Page = steps[step]
    const onNext = () => {
        setStep(step + 1)
    }
    return (
        <div><Page onNext={onNext} /></div>
    )
}

export default Register