import React, { useState, useEffect } from "react";
import Table from "./Table";
import Text from "../../Bhasini/Text";

const TourPackage: React.FC = () => {
  return (
    <div>
      <p className="text-2xl font-medium text-[#575757]">
        <Text>Your Products</Text>
      </p>
      <div className="flex flex-col gap-10 m-6">
        <Table />
      </div>
    </div>
  );
};

export default TourPackage;
