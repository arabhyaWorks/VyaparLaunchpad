// @ts-nocheck

import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Text from "../../Bhasini/Text";
import TextToSpeech from "@/TextToSpeech";

const ConfettiComponent = ({ duration = 5000 }) => {
  // duration in milliseconds
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showConfetti, setShowConfetti] = useState(true);

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Set a timeout to stop showing confetti after the specified duration
    const timer = setTimeout(() => setShowConfetti(false), duration);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [duration]);

  return showConfetti ? (
    <Confetti width={dimensions.width} height={dimensions.height} />
  ) : null;
};

const Success = () => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <ConfettiComponent duration={5000} /> {/* Show confetti for 5 seconds */}
      <div className="w-[38rem]">
        <TextToSpeech text="Congratulations! You have successfully onboarded your store" />
        <Text className="text-6xl font-medium mb-2 text-left font-lato text-black-500">
          Congratulations! You have successfully onboarded your store
        </Text>
        <Text className="text-2xl text-left mb-10 text-gray-600">
          You can now start selling on Vyapar Launchpad
        </Text>
      </div>
    </div>
  );
};

export default Success;
