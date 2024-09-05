// @ts-nocheck

import React, { useState, useContext } from "react";
import photos from "../../assets/Icons/photos.svg";
import Labels from "../../Contexts/StoreOnboarding";
import Text from "../../Bhasini/Text";
import { AppContext } from "../../AppContext";
import TextToSpeech from "@/TextToSpeech";

const Step6 = ({ lang }) => {
  const [images, setImages] = useState([]);
  const { storeData, setStoreData } = useContext(AppContext);

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...imageUrls]);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API}upload/s3/multiple`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.s3_links) {
        setStoreData((prevData) => ({
          ...prevData,
          storeImage: data.s3_links,
        }));
      } else {
        console.error("Failed to upload images:", data);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleImageUpload({ target: { files } });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <TextToSpeech text={Labels[lang].step6.heading} />
      <div className="mt-[-20px]">
        <Text className="text-4xl font-medium mb-2 text-left">
          {Labels[lang].step6.heading}
        </Text>
        <Text className="text-lg text-left mb-10 text-gray-600">
          {Labels[lang].step6.desc}
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
                multiple
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
                  {Labels[lang].step6.txt1}
                </Text>
                <Text className="text-base m-0 p-0">
                  {Labels[lang].step6.txt2}
                </Text>
                <Text className="text-black underline cursor-pointer m-0 p-0">
                  {Labels[lang].step6.txt3}
                </Text>
              </label>
            </>
          )}
        </div>

        <Text className="mt-2 text-sm text-gray-600">
          {images.length} / 5 {Labels[lang].step6.txt4}
        </Text>
      </div>
    </div>
  );
};

export default Step6;
