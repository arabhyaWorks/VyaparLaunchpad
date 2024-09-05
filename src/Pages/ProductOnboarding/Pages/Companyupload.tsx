import React, { useState } from "react";
import upload from "../../../assets/Onboarding/upload.svg";
import Text from "../../../Bhasini/Text";

type ProductVariationsProps = {
  productData: any;
  setProductData: any;
};

const Companyupload: React.FC<ProductVariationsProps> = ({
  productData,
  setProductData,
}) => {
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setProductData((prevData: any) => ({
        ...prevData,
        companyLogoFile: file,
      }));
    }
  };

  return (
    <div className="px-16 h-[20rem]">
      <h1 className="text-[#170F49] text-2xl mb-2 font-poppins font-bold">
        <Text>Company Logo</Text>
      </h1>
      <p className="text-[#6F6C90] font-poppins text-md">
        <Text>Upload Your Company Logo</Text>
      </p>
      <div className="mt-4 font-poppins"></div>
      <h1 className="text-[#170F49] text-md mb-6 mt-4 font-poppins font-medium">
        <Text>Company Logo</Text>
      </h1>

      <div className="flex justify-center items-center ">
        <div
          className="w-3/4 py-8 relative border-2 border-[#FCBD01] border-dashed rounded-lg p-6"
          id="dropzone"
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 z-50"
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className={`text-center ${selectedFile ? "hidden" : "block"}`}>
            <img className="mx-auto h-12 w-12" src={upload} alt="" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              <label htmlFor="file-upload" className="relative cursor-pointer">
                <span>
                  <Text>Choose a file or drag & drop it here</Text>{" "}
                </span>
              </label>
            </h3>
            <button className="mt-1 bg-white border border-gray-300  text-[#FCBD01] px-4 py-2 rounded-lg ">
              <Text>Browse</Text>
            </button>
          </div>
          <img
            src={selectedFile ? URL.createObjectURL(selectedFile) : ""}
            className={`my-auto mx-auto max-h-25 ${
              selectedFile ? "block" : "hidden"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Companyupload;
