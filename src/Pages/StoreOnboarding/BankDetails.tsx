// @ts-nocheck
import React, { useState, useContext } from "react";
import "./Step4.css";
import Labels from "../../Contexts/StoreOnboarding";
import Text from "../../Bhasini/Text";
import { AppContext } from "../../AppContext";
import TextToSpeech from "@/TextToSpeech";

const BankDetails = ({ lang }) => {
  const [name, setName] = useState("");
  const [accountNum, setAccountNum] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifsc, setIfscCode] = useState("");
  const { storeData, setStoreData } = useContext(AppContext);
  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "accountNum":
        setAccountNum(value);
        break;
      case "bankName":
        setBankName(value);
        break;
      case "ifsc":
        setIfscCode(value);
        break;
      default:
        break;
    }
    setStoreData((prevData) => ({
      ...prevData,
      bankDetails: {
        ...prevData.bankDetails,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission if needed
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center ">
      <TextToSpeech text="Enter Bank Details to get started with Vyapar Launchpad" />
      <div className="w-[38rem]">
        <Text className="text-4xl font-medium mb-2 text-left font-lato text-black-500">
          Enter Bank Details to get started with Vyapar Launchpad
        </Text>
        <Text className="text-lg text-left mb-10 text-gray-600">
          {Labels[lang].step4.desc}
        </Text>
      </div>
      <div className="w-[38rem]">
        <input
          type="text"
          placeholder={"Account Holder Name"}
          value={name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="custom-name-style "
        />

        <input
          type="text"
          placeholder={"Account Number"}
          value={accountNum}
          onChange={(e) => handleInputChange("accountNum", e.target.value)}
          className="custom-input-style top "
        />

        <input
          type="text"
          placeholder={"Bank Name"}
          value={bankName}
          onChange={(e) => handleInputChange("bankName", e.target.value)}
          className="custom-input-style "
        />

        <div className="step4inputbottom">
          <input
            type="text"
            placeholder={"IFSC code"}
            value={ifsc}
            onChange={(e) => handleInputChange("ifsc", e.target.value)}
            className="custom-input-style bottom "
          />
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
