import React, { useState } from "react";

interface StepperProps {
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  return (
    <div>
      <div className="w-full py-0">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((stepNumber) => (
            <div key={stepNumber} className="w-1/4">
              <div className="relative mb-2">
                <div
                  className="absolute flex align-center items-center align-middle content-center"
                  style={{
                    width: "calc(100% - 2.5rem - 1rem)",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {stepNumber > currentStep && (
                    <div
                      className="w-full  bg-[#EFF0F6] transition duration-500 py-1 rounded"
                      style={{ width: "100%" }}
                    />
                  )}
                  {stepNumber <= currentStep && stepNumber > 1 && (
                    <div
                      className="w-full bg-[#FCBD01] transition duration-500 py-1 rounded"
                      style={{
                        width:
                          currentStep === 2 && stepNumber === 3
                            ? "50%"
                            : "100%",
                      }}
                    />
                  )}
                </div>
                <div
                  className={`w-10 h-10 mx-auto ${
                    stepNumber < currentStep
                      ? "bg-[#FCBD01]"
                      : stepNumber === currentStep
                      ? "bg-[#FCBD01] border-2 border-[#FCBD01] text-white"
                      : "bg-[#EFF0F6] text-[#6F6C90]"
                  } rounded-full text-lg  flex items-center transition duration-500  `}
                >
                  <span className="text-center  w-full">{stepNumber}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
