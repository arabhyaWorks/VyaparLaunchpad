// @ts-nocheck

import React, { useState, useContext, useEffect } from "react";
import Labels from "../../Contexts/StoreOnboarding";
import Text from "../../Bhasini/Text";
import { AppContext } from "../../AppContext";
import TextToSpeech from "@/TextToSpeech";

const Step5 = ({ lang }) => {
  const [title, setTitle] = useState("");
  const { storeData, setStoreData } = useContext(AppContext);

  const handleTitleChange = (event) => {
    if (event.target.value.length <= 32) {
      setTitle(event.target.value);
      setStoreData((prevData) => ({
        ...prevData,
        title: event.target.value,
      }));
    }
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <TextToSpeech text={Labels[lang].step5.heading} />
      <div className="mt-[-20px]">
        <Text className="text-4xl font-medium mb-2 text-left font-lato">
          {Labels[lang].step5.heading}
        </Text>
        <Text className="text-lg text-left mb-10 text-gray-600">
          {Labels[lang].step5.desc}
        </Text>
        <textarea
          className="w-[630px] h-[178px] p-6 mb-4 border-2 border-black rounded-md resize-none focus:outline-none text-xl font-sans"
          value={title}
          onChange={handleTitleChange}
          placeholder={Labels[lang].step5.placeHolder}
        ></textarea>
        <Text className="text-sm text-gray-600 mt-[-10px]">
          {title.length}/32
        </Text>
      </div>
    </div>
  );
};

export default Step5;
