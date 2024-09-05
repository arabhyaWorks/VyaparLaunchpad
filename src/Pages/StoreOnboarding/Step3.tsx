// @ts-nocheck

import React, { useState, useEffect, useContext } from "react";
import { GOOGLE_MAPS_API_KEY } from "../../Contexts/StoreOnboarding";
import Labels from "../../Contexts/StoreOnboarding";
import Text from "../../Bhasini/Text";
import { AppContext } from "../../AppContext";
import TextToSpeech from "@/TextToSpeech";

const Step3 = ({ lang }) => {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const { storeData, setStoreData } = useContext(AppContext);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => console.log(error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    setStoreData((prevData) => ({
      ...prevData,
      address: event.target.value,
    }));
  };

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);

          // Use Google Maps Geocoding API to get the address
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;

          try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results.length > 0) {
              const fetchedAddress = data.results[0].formatted_address;
              setAddress(fetchedAddress); 
              setStoreData((prevData) => ({
                ...prevData,
                address: fetchedAddress,
                latitude: lat,
                longitude: lng,
              }));
            } else {
              console.log("No address found");
            }
          } catch (error) {
            console.error("Error fetching address:", error);
          }
        },
        (error) => console.log(error),
        { enableHighAccuracy: true }
      );
    }
  };

  return (
    <div className="flex justify-center items-center flex-col text-center flex-grow">
      <TextToSpeech text={Labels[lang].step3.heading} />
      <Text className="text-4xl font-medium mb-2">
        {Labels[lang].step3.heading}
      </Text>
      <Text className="mb-5 text-gray-600">{Labels[lang].step3.desc}</Text>
      <div className="relative inline-block w-[630px] h-[500px]">
        <input
          type="text"
          placeholder={Labels[lang].step3.placeholder}
          className="absolute top-2.5 left-1/2 w-4/5 max-w-[500px] p-2.5 border border-gray-300 rounded-full shadow-sm -translate-x-1/2"
          value={address}
          onChange={handleAddressChange}
        />
        <button
          style={{ top: 60 }}
          className="absolute left-1/2 px-5 py-2.5 border-none rounded-full bg-red-500 text-white cursor-pointer shadow-sm -translate-x-1/2"
          onClick={handleCurrentLocationClick}
        >
          {Labels[lang].step3.currentLocation}
        </button>
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${latitude},${longitude}`}
          width="600"
          height="450"
          allowFullScreen={true}
          loading="lazy"
          style={{ backgroundColor: "#f5f5f5" }}
          className="border-none rounded-lg w-full max-w-[600px] h-[450px] bg-grey-500"
        ></iframe>
      </div>
    </div>
  );
};

export default Step3;
