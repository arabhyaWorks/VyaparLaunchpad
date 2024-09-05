// @ts-nocheck

import React, { FunctionComponent, useContext, useEffect } from "react";
import DefaultLayout from "@/layout/DefaultLayout";
import StoreImg from "../../assets/images/storeImg.png";
import Text from "../../Bhasini/Text";
import { AppContext } from "@/AppContext";

const MyStore: FunctionComponent = () => {
  const { user, userStoreData, setUserStoreData } = useContext(AppContext);

  useEffect(() => {
    const fetchUserStoreData = async () => {
      if (!user?.id) {
        console.error("User ID is not available.");
        return;
      }

      try {
        const response = await fetch(
          `https://backend.vlai.in/store/${user.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user store data");
        }
        const data = await response.json();
        setUserStoreData(data);
      } catch (error) {
        console.error("Error fetching user store data:", error);
      }
    };

    if (!userStoreData) {
      fetchUserStoreData();
    }
  }, [user, userStoreData, setUserStoreData]);

  const store = userStoreData ? userStoreData[0] : null;

  console.log("userStoreData", userStoreData);

  return (
    <>
      <section className="p-5 bg-[#FFE9A9] h-full w-full">
        <div className="max-w-6xl mx-auto flex flex-col gap-5 bg-[#FFE9A9]">
          {store && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center p-5 bg-white rounded-lg shadow">
                <div className="flex items-center gap-5">
                  <img
                    className="w-20 h-20 rounded-lg object-cover"
                    loading="lazy"
                    alt="Store"
                    src={store?.storeImage[0] || StoreImg}
                  />
                  <div className="flex flex-col gap-2 text-black">
                    <div className="text-2xl font-bold text-[#333]">
                      <Text>{store.sellerInformation?.name}'s Shop</Text>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-black">
                        <Text>+91 9452624111</Text>
                      </div>
                      <div className="text-black">
                        <Text>animesh@civiccraft.in</Text>
                      </div>
                      <div className="text-black">
                        <Text>{store.address}</Text>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-auto">
                  <button className="px-4 py-2 bg-[#006a66] text-white rounded hover:bg-[#005753]">
                    <Text>Edit</Text>
                  </button>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex-1 p-5 bg-white rounded-lg shadow">
                  <div className="flex justify-between items-center mb-2.5">
                    <b className="text-xl text-[#333]">Seller’s Details</b>
                    <button className="px-4 py-2 bg-[#006a66] text-white rounded hover:bg-[#005753]">
                      <Text>Edit</Text>
                    </button>
                  </div>
                  <div className="h-px bg-[#e0e0e0] my-2.5"></div>
                  <div className="flex flex-col gap-2">
                    <div className="text-black">
                      <Text>Name: {store.sellerInformation?.name}</Text>
                    </div>
                    <div className="text-black">
                      <Text>Contact: +91 9452624111</Text>
                    </div>
                    <div className="text-black">
                      <Text>GST Number: {store.sellerInformation?.gst}</Text>
                    </div>
                    <div className="text-black">
                      <Text>FSSAI License: {store.sellerInformation?.fassai}</Text>
                    </div>
                    <div className="text-black">
                      <Text>PAN No.: {store.sellerInformation?.pan}</Text>
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-5 bg-white rounded-lg shadow">
                  <div className="flex justify-between items-center mb-2.5">
                    <b className="text-xl text-[#333]">
                      <Text>Bank Details</Text>
                    </b>
                    <button className="px-4 py-2 bg-[#006a66] text-white rounded hover:bg-[#005753]">
                      <Text>Edit</Text>
                    </button>
                  </div>
                  <div className="h-px bg-[#e0e0e0] my-2.5"></div>
                  <div className="flex flex-col gap-2">
                    <div className="text-black">
                      <Text>Account Holder: {store.bankDetails?.name}</Text>
                    </div>
                    <div className="text-black">
                      <Text>Account No.: {store.bankDetails?.accountNum}</Text>
                    </div>
                    <div className="text-black">
                      <Text>Bank Name: {store.bankDetails?.bankName}</Text>
                    </div>
                    <div className="text-black">
                      <Text>IFSC Code: {store.bankDetails?.ifsc}</Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MyStore;
