// @ts-nocheck
import React, { useState, useContext } from "react";
import photos from "../../assets/Icons/photos.svg";
import Labels from "../../Contexts/StoreOnboarding";
import Text from "../../Bhasini/Text";
import { AppContext } from "../../AppContext";
import TextToSpeech from "@/TextToSpeech";

const CancelledCheck = ({ lang }) => {
  const [images, setImages] = useState([]);
  const { storeData, setStoreData } = useContext(AppContext);
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImages([imageUrl]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API}upload/s3`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.s3_link) {
        setStoreData((prevData) => ({
          ...prevData,
          cancelledCheque: data.s3_link,
        }));
      } else {
        console.error("Failed to upload image:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImageUpload({ target: { files: [file] } });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <TextToSpeech text="Please upload a cancelled cheque/ bank statement/ passbook cover to
          verify your bank details" />
      <div className="mt-[-20px]">
        <Text className="text-4xl font-medium mb-2 text-left">
          Upload Cancelled Bank Cheque
        </Text>
        <Text className="text-lg text-left mb-10 text-gray-600">
          Please upload a cancelled cheque/ bank statement/ passbook cover to
          verify your bank details
        </Text>

        <div
          className="h-72 border-2 border-dashed border-gray-300 rounded-md flex flex-col justify-center items-center text-center relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {images.length !== 0 ? (
            <div className="w-full flex flex-wrap justify-center gap-2 mt-5">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Upload ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md"
                />
              ))}
            </div>
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="flex flex-col justify-center items-center cursor-pointer"
              >
                <img
                  src={photos}
                  alt="Upload Icon"
                  className="w-12 h-12 mb-2"
                />
                <Text className="text-xl font-bold m-0 p-0">
                  Drag your photos here
                </Text>
                <Text className="text-black underline cursor-pointer m-0 p-0">
                  {Labels[lang].step6.txt3}
                </Text>
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CancelledCheck;
