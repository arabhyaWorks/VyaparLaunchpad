import React from "react";
import { useNavigate } from "react-router-dom";
import ill1 from "../../assets/images/ill1.svg";
import addIcon from "../../assets/Icons/addIcon.svg";
import search from "../../assets/Icons/search.svg";
import Text from "../../Bhasini/Text";

const apiUrl = (import.meta as any).env.VITE_BASE_API;

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg shadow-sm bg-white m-6">
      <div className="flex flex-row justify-between p-[12px] pb-[8px] border-b-2">
        <div className="flex justify-center items-center">
          <Text className="text-[#CFCDCD] text-lg font-poppins font-medium">
            Products
          </Text>
        </div>
        <div className="flex flex-row justify-center items-center bg-[#EAE8E8] rounded-lg px-[8px] py-[2px]">
          <img src={search} className="w-5 h-5 mr-2" />
          <Text className="text-[#D1D1D1] font-medium font-lato">Search</Text>
        </div>
      </div>
      <div className="p-6 flex justify-between items-start">
        <div>
          <Text className="text-2xl font-medium mb-2">Add your products</Text>
          <Text className="text-gray-500 mb-6">
            Add products in your store to make your store live
          </Text>
          <button
            onClick={() => {
              navigate("/product-onboarding");
            }}
            className="flex items-center px-4 py-2 bg-[#006A66] text-white rounded-lg"
          >
            <img
              src={addIcon}
              style={{ width: 20, height: 20 }}
              className="mr-2"
            />
            <Text>Add Products</Text>
          </button>
        </div>
        <div>
          <img
            className="w-72 h-auto"
            src={ill1}
            alt="Add Products Illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
