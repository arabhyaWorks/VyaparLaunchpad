import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../AppContext";

interface BottomBarProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const BottomBar: React.FC<BottomBarProps> = ({ step, setStep }) => {
  const navigate = useNavigate();
  const { user, storeData, setStoreData } = useContext(AppContext);

  const label = (step: number) => {
    if (step === 1) {
      return "Get Started";
    } else if (step === 13) {
      return "Finish";
    } else {
      return "Next";
    }
  };

  const handleOnClick = async (step: number) => {
    if (step === 13) {
      // Include user ID in storeData
      const updatedStoreData = { ...storeData, user_id: user?.id };
      console.log("storeDataActual", updatedStoreData);

      try {
        await axios.post(`${(import.meta as any).env.VITE_BASE_API}store`, updatedStoreData);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error submitting store data:", error);
      }
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div
      className={`
        ${/*fixed bottom-0 bg-[#f6f6f6]*/ ""} 
        flex w-full
        border-t-[1px] border-[#ebebeb]
         ${step !== 1 ? "justify-between" : "justify-end"} 
          py-4 px-8`}
    >
      <button
        onClick={() => {
          if (step === 1) return;
          setStep(step - 1);
        }}
        className={`
          ${step === 1 ? "hidden" : ""}
          text-black font-semibold py-3 px-10  md:w-auto
          font-lato
        `}
      >
        Back
      </button>
      <button
        onClick={() => {
          handleOnClick(step);
        }}
        className={`
          bg-[#FCBD01]
          ${step === 1 ? "w-[200px] md:w-auto" : ""}
          text-black font-semibold py-3 px-10 rounded-xl  
          font-lato
        `}
      >
        {label(step)}
      </button>
    </div>
  );
};

export default BottomBar;
