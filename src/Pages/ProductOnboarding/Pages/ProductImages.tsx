import React, { useState } from "react";
import Text from "../../../Bhasini/Text";

type ProductVariationsProps = {
  productData: any;
  setProductData: any;
};

const ProductImages: React.FC<ProductVariationsProps> = ({
  productData,
  setProductData,
}) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setProductData((prevData: any) => ({
        ...prevData,
        imageFiles: fileArray,
      }));

      const urls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  return (
    <div className="px-16">
      <h1 className="text-[#170F49] text-2xl mb-2 font-poppins font-bold">
        <Text>Product Images</Text>
      </h1>
      <p className="text-[#6F6C90] font-poppins text-sm">
        <Text>Upload Your Product Images</Text>
      </p>
      <div className="mt-4 font-poppins">
        <label className="block text-[#170F49] text-md font-medium mb-2">
          <Text>Product Images</Text>
        </label>
        <div className="grid grid-cols-3 gap-4">
          {productData.images &&
            productData.images.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                style={{
                  width: 110,
                  height: 90,
                }}
                className="rounded-xl border-2 border-[#FCBD01]"
              />
            ))}
          {previewUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Preview ${index + 1}`}
              style={{
                width: 110,
                height: 90,
              }}
              className="rounded-xl border-2 border-[#FCBD01]"
            />
          ))}
          <div className="border-2 border-[#FCBD01] rounded-xl flex items-center justify-center relative">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 z-50"
              accept="image/*"
              onChange={handleFileChange}
              multiple
              id="upload-button"
            />
            <label
              htmlFor="upload-button"
              className="cursor-pointer flex items-center justify-center w-full h-full"
            >
              <button
                style={{
                  marginLeft: -40,
                }}
                className="p-2 text-6xl text-yellow-300 rounded-md"
              >
                +
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
