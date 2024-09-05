import React, { useEffect, useState, useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import siri from "./assets/LottieAnimation/siri3.json";
import "./siri.css";

const SiriPlayer = ({ length, listening, onClick }) => {
  const [scale, setScale] = useState(1);
  const [speed, setSpeed] = useState(1); // New state for speed control
  const [isScaled, setIsScaled] = useState(false);


  useEffect(() => {
    let scaler = length.split(" ")[length.split(" ").length - 1].length;
    setScale(scaler * 5);
    // console.log(scaler);
  }, [length]);

  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      if (listening) {
        playerRef.current.play();
        setSpeed(5); // Increase speed when listening
      } else {
        playerRef.current.pause();
        setSpeed(1); // Decrease speed when not listening
      }
    }
  }, [listening]);

  return (
    <button
      className={`siri-btn ${isScaled ? "scaled" : ""}`}
      onClick={()=>{
        setIsScaled(!isScaled);
        onClick()
      }}
    >
      <Player
        ref={playerRef}
        autoplay={false} // Autoplay is controlled manually
        loop
        src={siri}
        // style={{
        //   // height: `${150 + scale}px`,
        //   // width: `${150 + scale}px`,
        //   height: 100,
        //   width: 100,
        //   transition: "all 0.1s ease-out",
        //   // cursor: "pointer",
        // }}

        className="siriButton"
        speed={5} // Apply the speed dynamically
      />
    </button>
  );
};

export default SiriPlayer;
