import React, { useState } from "react";
import Ecom from "../../../assets/Onboarding/contact.svg";
import mail from "../../../assets/Onboarding/mail.svg";
import Marketing from "../../../assets/Onboarding/call.svg";
import Company from "../../../assets/Onboarding/company.svg";

import { useDispatch, useSelector } from "react-redux";
import { setSellerDetails } from "../../../redux/slice";
import { RootState } from "../../../redux/store";

import Text from "../../../Bhasini/Text.tsx";

type SearchLangProps = {
  productData: any;
  setProductData: any;
};

const SellerDetails = ({ productData, setProductData }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userInfo);
  const [shopName, setShopName] = useState("");
  const [sellerState, setSellerState] = useState("");
  const [productLanguage, setProductLanguage] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const handleSave = () => {
    dispatch(
      setSellerDetails({
        name: shopName,
        state: sellerState,
        language: productLanguage,
        category: productCategory,
      })
    );
    console.log(user);
  };
  return (
    <div className="px-16 h-[20rem] ">
      <h1 className="text-[#170F49] text-2xl mb-2 font-poppins font-bold">
        <Text>Seller’s Detail </Text>
      </h1>
      <p className="text-[#6F6C90] font-poppins text-sm">
        <Text>Enter your virtual shop’s details.</Text>
      </p>
      <div className="flex font-poppins mt-8">
        <div className="w-3/4 relative">
          <label className="block text-[#170F49] text-sm font-medium mb-2">
            <Text>Shop Name</Text>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder={"Shop Name"}
              value={productData.shopName}
              onChange={(e) =>
                setProductData({ ...productData, shopName: e.target.value })
              }
              onBlur={handleSave}
              className="w-full border-2 border-[#EFF0F6] rounded-3xl px-4 py-2"
            />
            <img
              src={Ecom}
              alt="Ecom"
              className="absolute top-1/2 transform -translate-y-1/2 right-4 h-6 w-5"
            />
          </div>
        </div>
        <div className="w-3/4 ml-4 relative">
          <label className="block text-[#170F49] text-sm font-medium mb-2">
            <Text>Seller State"</Text>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder={"Seller State"}
              value={productData.sellerState}
              onBlur={handleSave}
              onChange={(e) =>
                // setSellerState(e.target.value)
                setProductData({ ...productData, sellerState: e.target.value })
              }
              className="w-full border-2 border-[#EFF0F6] rounded-3xl px-4 py-2"
            />
            <img
              src={mail}
              alt="Healthcare"
              className="absolute top-1/2 transform -translate-y-1/2 right-4 h-6 w-5"
            />
          </div>
        </div>
      </div>
      <div className="flex font-poppins mt-4">
        <div className="w-3/4 mr-4 relative">
          <label className="block text-[#170F49] text-sm font-medium mb-2">
            <Text>Product Language</Text>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder={"Product Language"}
              value={productData.productLanguage}
              onBlur={handleSave}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  productlanguage: e.target.value,
                })
              }
              className="w-full border-2 border-[#EFF0F6] rounded-3xl px-4 py-2"
            />
            <img
              src={Marketing}
              alt="Marketing"
              className="absolute top-1/2 transform -translate-y-1/2 right-4 h-6 w-5"
            />
          </div>
        </div>
        <div className="w-3/4 relative">
          <label className="block text-[#170F49] text-sm font-medium mb-2">
            <Text>Product Category</Text>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder={"Product Category"}
              value={productData.productCategory}
              onBlur={handleSave}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  productCategory: e.target.value,
                })
              }
              className="w-full border-2 border-[#EFF0F6] rounded-3xl px-4 py-2"
            />
            <img
              src={Company}
              alt="Settings"
              className="absolute top-1/2 transform -translate-y-1/2 right-4 h-6 w-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
