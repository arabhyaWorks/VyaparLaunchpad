import React, { useState } from 'react';

type OverlayProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Overlay: React.FC<OverlayProps> = ({isOpen, setIsOpen}) => {


  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[470px]">
            <h1 className="font-ubuntu text-black-600 text-7xl font-extrabold text-center mb-4">
              V<span className="text-[#FCBD01]">L</span>
            </h1>
            <p className="font-poppins text-black-600 text-center text-xl mb-4" style={{ fontWeight: 550 }}>
              Welcome to Vya<span className="text-[#FCBD01]">paar</span> Launch<span className="text-[#FCBD01]">pad</span>
            </p>
            <p className="text-[#6E6D6D] text-center text-lg mb-4">
              Discover the future of e-commerce, with our voice-first technology and multilinguality.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-4 bg-yellow-400 text-black-600 rounded-md p-2 hover:bg-yellow-500 text-lg duration-150"
              style={{ fontWeight: 550 }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overlay;
