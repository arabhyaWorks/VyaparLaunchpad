import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import DefaultLayout from "../../layout/DefaultLayout";
import AddProduct from "../../components/common/AddProduct";
import ProductLinguisticSathi from "../../components/common/ProSathi";
import Text from "../../Bhasini/Text";

const Dashboard: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      <Text className="text-2xl font-medium text-[#575757]">Your Products</Text>
      <div className="flex flex-grow flex-col ">
        <div className="md:col-span-2 xl:col-span-4">
          <AddProduct />

          <Text className="text-2xl font-medium text-[#575757]">
            Linguistic Sathi (Transliteration)
          </Text>
          <ProductLinguisticSathi />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
