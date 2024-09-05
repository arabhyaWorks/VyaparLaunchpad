// @ts-nocheck

import React from "react";
import Navbar from "../../components/common/Navbar";
import BottomBar from "../../components/common/BottomBar";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";
import Step9 from "./Step9";
import Step10 from "./Step10";
import BankDetails from "./BankDetails";
import CancelledCheck from "./CancelledCheck";
import Success from "./Success";

const StoreOnboarding: React.FC = () => {
  const [step, setStep] = React.useState<number>(1);
  const [lang, setLang] = React.useState<string>("en");
  const [proCat, setProCat] = React.useState<string>("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {step === 1 && <Step1 />}
      {step === 2 && (
        <Step2 lang={lang} proCat={proCat} setProCat={setProCat} />
      )}
      {step === 3 && <Step3 lang={lang} />}
      {step === 4 && <Step4 lang={lang} />}
      {step === 5 && <Step5 lang={lang} />}
      {step === 6 && <Step6 lang={lang} />}
      {step === 7 && <Step7 lang={lang} />}
      {step === 8 && <Step8 lang={lang} />}
      {step === 9 && <Step9 lang={lang} />}
      {step === 10 && <Step10 lang={lang} />}
      {step === 11 && <BankDetails lang={lang} />}
      {step === 12 && <CancelledCheck lang={lang} />}
      {step === 13 && <Success />}

      <BottomBar step={step} setStep={setStep} />
    </div>
  );
};

export default StoreOnboarding;
