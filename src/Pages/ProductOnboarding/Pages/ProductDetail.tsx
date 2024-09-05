import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "../../../redux/slice";
import Text from "../../../Bhasini/Text";

type ProductDetailsProps = {
  productData: any;
  setProductData: any;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({
  productData,
  setProductData,
}) => {
  const dispatch = useDispatch();
  const [productTitle, setProductTitle] = useState("");
  const [productPricing, setProductPricing] = useState(0);

  const handleSave = () => {
    dispatch(
      setProductDetails({
        title: productTitle,
        pricing: productPricing,
        description: "", // set to empty string by default
        variations: "", // set to empty array by default
        images: [], // set to empty array by default
      })
    );
  };

  return (
    <div className="px-16">
      <h1 className="text-[#170F49] text-2xl mb-2 font-poppins font-bold">
        <Text>Product Details</Text>
      </h1>
      <p className="text-[#6F6C90] font-poppins text-md">
        <Text>Enter Your Product Details</Text>
      </p>
      <div className="mt-4 font-poppins">
        <label className="block  text-[#170F49] text-md font-medium mb-2">
          <Text>Product Title</Text>
        </label>
        <input
          placeholder={"Enter your product title here"}
          value={productData.productTitle}
          onChange={(event) =>
            setProductData({ ...productData, ProductTitle: event.target.value })
          }
          onBlur={handleSave}
          className="w-full border-2 border-[#EFF0F6] rounded-2xl px-4 py-2"
        />
        <label className="block  text-[#170F49] text-md font-medium mb-2 mt-4">
          <Text>Price</Text>
        </label>
        <input
          placeholder={"Enter your product price here"}
          value={productData.productPricing}
          onChange={(event) =>
            // setProductPricing(Number(event.target.value))
            setProductData({ ...productData, Pricing: event.target.value })
          }
          onBlur={handleSave}
          className="w-full border-2 border-[#EFF0F6] rounded-2xl px-4 py-2"
        />
        <label className="block  text-[#170F49] text-md font-medium mb-2 mt-4">
          <Text>Quantity</Text>
        </label>
        <input
          placeholder={"Enter your product quantity here"}
          value={productData.productQuantity}
          onChange={(event) =>
            setProductData({ ...productData, productQuantity: event.target.value })
          }
          onBlur={handleSave}
          className="w-full border-2 border-[#EFF0F6] rounded-2xl px-4 py-2"
        />
      </div>
    </div>
  );
};

export default ProductDetails;
