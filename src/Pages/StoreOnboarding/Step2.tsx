// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import Labels from "../../Contexts/StoreOnboarding";
import Text from "../../Bhasini/Text";
import TextToSpeech from "../../TextToSpeech";

interface CompProps {
  lang: string;
  proCat: string;
  setProCat: React.Dispatch<React.SetStateAction<string>>;
}

const Step2: React.FC<CompProps> = ({ lang, proCat, setProCat }) => {
  const { storeData, setStoreData } = useContext(AppContext);
  const [playText, setPlayText] = useState<string>(Labels[lang]["step2"].heading);



  const handleClick = (label: string) => {
    setStoreData((prevData: any) => ({
      ...prevData,
      productCategory: label,
    }));
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 overflow-hidden">
      <TextToSpeech text={playText} />
      <div className="mb-10 mt-4">
        <Text className="text-4xl font-medium text-center font-lato">
          {Labels[lang]["step2"].heading}
        </Text>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Labels[lang]["step2"]["cards"].map(
          (card: { label: string; img: string }, index: number) => (
            <div
              key={index}
              className={`border-[1.5px] rounded-lg p-4 pt-10 flex flex-col items-left cursor-pointer
                w-[180px] hover:shadow-lg hover:border-black transition duration-300 ease-in-out
                 ${
                   proCat === card.label
                     ? "border-black shadow-lg"
                     : "border-gray-300"
                 }`}
              onClick={() => {
                setProCat(card.label);
                handleClick(card.label);
              }}
            >
              <img src={card.img} alt="icon" className="w-10 h-10 mb-2" />
              <Text className="font-lato">{card.label}</Text>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Step2;
