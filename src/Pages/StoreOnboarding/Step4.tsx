// @ts-nocheck

import React, { useState, useContext } from "react";
import "./Step4.css";
import Labels from "../../Contexts/StoreOnboarding";
import Text from "../../Bhasini/Text";
import { AppContext } from "../../AppContext";
import TextToSpeech from "@/TextToSpeech";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
  "Ladakh",
  "Jammu and Kashmir",
];

const Step4 = ({ lang }) => {
  const { storeData, setStoreData } = useContext(AppContext);
  
  const handleInputChange = (field, value) => {
    setStoreData((prevData) => ({
      ...prevData,
      Shopaddress: {
        ...prevData.Shopaddress,
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
        <div className=" ">
          <select
            value={storeData?.Shopaddress?.state || ""}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className="custom-dropdown-style"
          >
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className=" ">
          <input
            type="text"
            placeholder={Labels[lang].step4.flatHouse}
            value={storeData?.Shopaddress?.flat || ""}
            onChange={(e) => handleInputChange("flat", e.target.value)}
            className="custom-input-style top"
          />
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder={Labels[lang].step4.street}
            value={storeData?.Shopaddress?.street || ""}
            onChange={(e) => handleInputChange("street", e.target.value)}
            className="custom-input-style"
          />
        </div>
        <div className="step4input">
          <input
            type="text"
            placeholder={Labels[lang].step4.landmark}
            value={storeData?.Shopaddress?.landmark || ""}
            onChange={(e) => handleInputChange("landmark", e.target.value)}
            className="custom-input-style"
          />
        </div>
        <div className="step4input">
          <input
            type="text"
            placeholder={Labels[lang].step4.district}
            value={storeData?.Shopaddress?.district || ""}
            onChange={(e) => handleInputChange("district", e.target.value)}
            className="custom-input-style"
          />
        </div>
        <div className="step4input">
          <input
            type="text"
            placeholder={Labels[lang].step4.city}
            value={storeData?.Shopaddress?.city || ""}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="custom-input-style"
          />
        </div>
        <div className="step4inputbottom">
          <input
            type="text"
            placeholder={Labels[lang].step4.pinCode}
            value={storeData?.Shopaddress?.pinCode || ""}
            onChange={(e) => handleInputChange("pinCode", e.target.value)}
            className="custom-input-style bottom"
          />
        </div>
      </div>
    </div>
  );
};

export default Step4;
