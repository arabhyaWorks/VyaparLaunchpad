// @ts-nocheck

import React, { useState, useContext } from "react";
import "./Step4.css";
import Labels from "../../Contexts/StoreOnboarding";
import Text from "../../Bhasini/Text";
import { AppContext } from "../../AppContext";
import TextToSpeech from "@/TextToSpeech";

const Step8 = ({ lang }) => {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [pan, setPan] = useState("");
  const [fassai, setFassai] = useState("");
  const [gst, setGST] = useState("");
  const { storeData, setStoreData } = useContext(AppContext);

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "companyName":
        setCompanyName(value);
        break;
      case "aadhar":
        setAadhar(value);
        break;
      case "pan":
        setPan(value);
        break;
      case "fassai":
        setFassai(value);
        break;
      case "gst":
        setGST(value);
        break;
      default:
        break;
    }

    setStoreData((prevData) => ({
      ...prevData,
      sellerInformation: {
        ...prevData.sellerInformation,
        [field]: value,
      },
    }));
  };


  return (
    <div className="flex-grow flex flex-col justify-center items-center ">
      <TextToSpeech text={Labels[lang].step4.heading} />
      <div className="w-[38rem]">
        <Text className="text-4xl font-medium mb-2 text-left font-lato text-black-500">
          {Labels[lang].step4.heading}
        </Text>
        <Text className="text-lg text-left mb-10 text-gray-600">
          {Labels[lang].step4.desc}
        </Text>
      </div>
      <div className="w-[38rem]">
        <input
          type="text"
          placeholder={"Enter your Name"}
          value={name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="custom-name-style "
        />

        <input
          type="text"
          placeholder={"Enter Company Name"}
          value={companyName}
          onChange={(e) => handleInputChange("companyName", e.target.value)}
          className="custom-input-style top "
        />

        <input
          type="text"
          placeholder={"Enter Aadhar number"}
          value={aadhar}
          onChange={(e) => handleInputChange("aadhar", e.target.value)}
          className="custom-input-style "
        />

        <input
          type="text"
          placeholder={"Enter Pan card number"}
          value={pan}
          onChange={(e) => handleInputChange("pan", e.target.value)}
          className="custom-input-style "
        />

        <input
          type="text"
          placeholder={"Enter GSTIN number"}
          value={gst}
          onChange={(e) => handleInputChange("gst", e.target.value)}
          className="custom-input-style "
        />

        <div className="step4inputbottom">
          <input
            type="text"
            placeholder={"Enter FASSAI License"}
            value={fassai}
            onChange={(e) => handleInputChange("fassai", e.target.value)}
            className="custom-input-style bottom"
          />
        </div>
      </div>
    </div>
  );
};

export default Step8;
