// @ts-nocheck

import React from "react";
import Text from "../../Bhasini/Text";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import TextToSpeech from "@/TextToSpeech";


const Step7: React.FC = () => {
  const { storeData, setStoreData } = useContext(AppContext);
  return (
    <div className=" flex-grow flex flex-col md:flex-row items-center justify-between p-8 px-[88px] bg-white  overflow-hidden">
      <TextToSpeech text="Congratulations! for getting this far" />
      {/* Left Side */}
      <div className="md:w-1/2 p-8 w-1/2">
        <Text variant="subtitle" className="text-xl font-semibold mb-2">
          Step 2
        </Text>
        <Text variant="title" className="text-4xl font-medium mb-2 text-left">
          Now let's enter the seller details
        </Text>
        <Text
          variant="body"
          className="text-gray-600 text-lg text-left mb-10 text-gray-600"
        >
          In this step, you’ll add some of the amenities your place offers, plus
          5 or more photos. Then you’ll create a title and description.
        </Text>
      </div>

      {/* Right Side */}
      <div className=" w-1/2 md:w-1/2 p-8">
        <video
          data-testid="video-player"
          autoPlay
          crossOrigin="anonymous"
          playsInline
          preload="auto"
          style={{ objectFit: "cover", width: 493, height: 430 }}
        >
          <source src="https://stream.media.muscache.com/H0101WTUG2qWbyFhy02jlOggSkpsM9H02VOWN52g02oxhDVM.mp4?v_q=high" />
        </video>
      </div>
    </div>
  );
};

export default Step7;
