import React from "react";
import StepName from "../Steps/StepName/StepName";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";
import { useState } from "react";

const steps = {
  1: StepName,
  2: StepAvatar,
};

const Activate = () => {
  const [step, setStep] = useState(1);
  const Page = steps[step];
  const onNext = () => {
    setStep(step + 1);
  };
  return (
    <div>
      <Page onNext={onNext}></Page>
    </div>
  );
};

export default Activate;
