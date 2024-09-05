// @ts-nocheck

import React, { useState, useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import QRCode from "qrcode.react";
import '../ProductOnboarding/navBar.css'
import User from "../../assets/Icons/personOutline.svg";
import search from "../../assets/Icons/searchOutline.svg";
import CopyButton from "../../assets/Icons/copyButton.svg";
import BackIcon from "../../assets/Icons/backIcon.svg";
import Img1 from "../../assets/images/sareeImage.png";
import OverLayBG from "../../assets/images/OverlayBackground.svg";
import Text from "../../Bhasini/Text";

import { AppContext } from "../../AppContext";

const photoroomApi = "sandbox_bf94ab81f439e8cc7c75b8e42607c85d9d4345d5";

const CopyBtn = () => {
  return (
    <div className="flex justify-end mt-2">
      <button className="flex items-center border border-[#EFF0F6] p-2 rounded-lg">
        <span className="text-[#FCBD01] font-medium text-sm">
          <Text>Copy</Text>
        </span>
        <img src={CopyButton} alt="Copy Icon" className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
};

const LivePage = () => {
  const { shareable_id } = useParams();
  const backendUrl = import.meta.env.VITE_BASE_API;
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [shareableLink, setShareableLink] = useState<string | null>(null); // Specify string or null
  const modalRef = useRef<HTMLDivElement>(null); // Specify HTMLDivElement type
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${backendUrl}public/${shareable_id}`);
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching public product:', error);
      }
    };

    fetchProductData();
  }, [shareable_id, backendUrl]);

  console.log(productData);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShareableLink(null); // Reset shareableLink to null to close modal
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink || "");
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 1500);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split(".");
    if (nameParts.length === 2) {
      setProductData((prevData) => ({
        ...prevData,
        [nameParts[0]]: {
          ...prevData[nameParts[0]],
          [nameParts[1]]: value,
        },
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleArrayChange = (e, index, arrayName) => {
    const { value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      response: {
        ...prevData.response,
        [arrayName]: prevData.response[arrayName].map((item, i) =>
          i === index ? value : item
        ),
      },
    }));
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white flex flex-col h-full w-full">
      <div className="navbar flex justify-between items-center bg-white p-5 shadow-md mb-2.5">
        <span className="text-xl font-semibold text-black">
          Vya<span className="text-[#FCBD01]">par</span> Laun
          <span className="text-[#FCBD01]">pad</span>
        </span>
        <div className="icons flex space-x-2">
          <img src={User} alt="" className="w-7 h-7" />
          <img src={search} alt="" className="w-7 h-7" />
        </div>
      </div>

      <div className="flex flex-1 flex-row px-10 justify-center gap-24 mb-5">
        <div className="flex flex-col w-[37rem]">
          <div className="w-[33rem]">
            <div
              onClick={() => navigate("/ecommerce")}
              className="m-5 cursor-pointer"
            >
              <img src={BackIcon} alt="" className="w-7 h-7" />
            </div>

            {productData.response.ProductName && (
              <div style={styles.shadowComp}>
                <span className="label">
                  <Text>Product Title</Text>
                </span>
                <div className="line" />
                {isEditing ? (
                  <input
                    type="text"
                    name="response.ProductName"
                    value={productData.response.ProductName}
                    onChange={handleChange}
                    style={{ fontFamily: "poppins" }}
                  />
                ) : (
                  <p
                    style={{ fontFamily: "poppins" }}
                    className="productTitle"
                  >
                    <Text>{productData.response.ProductName}</Text>
                  </p>
                )}
              </div>
            )}

            {productData.pricing && (
              <div style={styles.shadowComp}>
                <div className="flex justify-between">
                  <div>
                    <span className="label">
                      <Text>Product Pricing</Text>
                    </span>
                    <div className="line" />
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="pricing"
                      value={productData.pricing}
                      onChange={handleChange}
                      style={{
                        fontFamily: "poppins",
                        fontSize: 26,
                        fontWeight: "600",
                      }}
                    />
                  ) : (
                    <p
                      className="text-[#263238] text-2xl font-semibold mt-1"
                      style={{ fontFamily: "poppins" }}
                    >
                      <Text>{"₹" + productData.pricing}</Text>
                    </p>
                  )}
                </div>
              </div>
            )}

            {productData.response.ProductTagline && (
              <div style={styles.shadowComp}>
                <span className="label">
                  <Text>Product Tagline</Text>
                </span>
                <div className="line" />
                {isEditing ? (
                  <input
                    type="text"
                    name="response.ProductTagline"
                    value={productData.response.ProductTagline}
                    onChange={handleChange}
                    style={{ fontFamily: "poppins" }}
                  />
                ) : (
                  <p style={{ fontFamily: "poppins" }} className="txt">
                    <Text>{productData.response.ProductTagline}</Text>
                  </p>
                )}
              </div>
            )}

            {productData.response.ProductDescription && (
              <div style={styles.shadowComp}>
                <span className="label">
                  <Text>Product Description</Text>
                </span>
                <div className="line" />
                {isEditing ? (
                  <textarea
                    name="response.ProductDescription"
                    value={productData.response.ProductDescription}
                    onChange={handleChange}
                    style={{ fontFamily: "poppins" }}
                  />
                ) : (
                  <p style={{ fontFamily: "poppins" }} className="txt">
                    <Text>{productData.response.ProductDescription}</Text>
                  </p>
                )}
              </div>
            )}

            {productData.response.AboutProduct.length > 0 && (
              <div style={styles.shadowComp}>
                <span className="label">
                  <Text>Product Features</Text>
                </span>
                <div className="line" />
                <ul style={{ listStyleType: "disc", paddingLeft: 20 }}>
                  {isEditing
                    ? productData.response.AboutProduct.map((item, index) => (
                        <li key={index} style={{ fontFamily: "poppins" }}>
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleArrayChange(e, index, "AboutProduct")
                            }
                            style={{ fontFamily: "poppins" }}
                          />
                        </li>
                      ))
                    : productData.response.AboutProduct.map((item, index) => (
                        <li
                          key={index}
                          style={{ fontFamily: "poppins" }}
                          className="txt"
                        >
                          <Text>{item}</Text>
                        </li>
                      ))}
                </ul>
              </div>
            )}

            {productData.response.CustomerAcquisition.length > 0 && (
              <div style={styles.shadowComp}>
                <span className="label">
                  <Text>Customer Acquisition</Text>
                </span>
                <div className="line" />
                <ul style={{ listStyleType: "disc", paddingLeft: 20 }}>
                  {productData.response.CustomerAcquisition &&
                  productData.response.CustomerAcquisition.length > 0 ? (
                    isEditing ? (
                      productData.response.CustomerAcquisition.map(
                        (item, index) => (
                          <li key={index} style={{ fontFamily: "poppins" }}>
                            <input
                              type="text"
                              value={item}
                              onChange={(e) =>
                                handleArrayChange(
                                  e,
                                  index,
                                  "CustomerAcquisition"
                                )
                              }
                              style={{ fontFamily: "poppins" }}
                            />
                          </li>
                        )
                      )
                    ) : (
                      productData.response.CustomerAcquisition.map(
                        (item, index) => (
                          <li
                            key={index}
                            style={{ fontFamily: "poppins" }}
                            className="txt"
                          >
                            <Text>{item}</Text>
                          </li>
                        )
                      )
                    )
                  ) : (
                    <li>
                      <Text>No data available</Text>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col w-[37rem]">
          <div className="flex justify-end mt-4">
          </div>
          {shareableLink && (
            <div className="modal absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
              <div
                ref={modalRef}
                className="content p-6 bg-white rounded-lg shadow-lg text-center"
                style={{
                  backgroundImage: `url(${OverLayBG})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }}
              >
                <h1 className="font-sans-serif font-bold text-black text-title-md mb-8">
                  <Text>Your Product is now live!</Text>
                </h1>
                <div className="flex justify-center m-3">
                  <QRCode value={shareableLink} />
                </div>
                <div className="text-left">
                  <div className="text-center mt-4">
                    <p className="font-sans-serif text-lg">
                      <Text>OR</Text>
                    </p>
                  </div>
                  <p className="mb-2 font-sans-serif font-bold text-black">
                    <Text>Copy Link</Text>
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="w-6/7 flex items-center justify-between bg-gray border border-gray-300 rounded-lg p-3">
                      <p className="flex-grow">
                        <Text>{shareableLink}</Text>
                      </p>
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="ml-2 px-4 py-2 bg-gray text-black font-bold rounded-md"
                    >
                      <Text>{copySuccess ? "Copied!" : "Copy"}</Text>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {productData.response.newImages && productData.response.newImages.length > 0 && (
            <div className="w-[37rem]">
              <div className="flex justify-center mt-8">
                <img
                  className="rounded-lg shadow-2xl shadow-lg"
                  style={{ width: "20rem", height: "20rem" }}
                  src={`https://image-api.photoroom.com/v2/edit?background.prompt=${productData.response.ProductPrompt}&background.seed=42&outputSize=1000x1000&padding=0.1&imageUrl=${productData.response.newImages[0]}&apiKey=${photoroomApi}`}
                />
              </div>

              {productData.response.newImages.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {productData.response.newImages.slice(1).map((img, index) => (
                    <div className="w-[72px]" key={index}>
                      <img
                        src={`https://image-api.photoroom.com/v2/edit?background.prompt=${productData.response.ProductPrompt}&background.seed=42&outputSize=1000x1000&padding=0.1&imageUrl=${img}&apiKey=${photoroomApi}`}
                        className="w-full h-auto rounded-lg shadow-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {productData.response.SeoFriendlyTags &&
            productData.response.SeoFriendlyTags.length > 0 && (
              <div className="bg-white shadow-md rounded-lg border border-[#EFF0F6] mt-8 p-6">
                <span className="label">
                  <Text>Keywords</Text>
                </span>
                <div className="line" />
                {isEditing ? (
                  <input
                    type="text"
                    name="response.SeoFriendlyTags"
                    value={productData.response.SeoFriendlyTags.join(", ")}
                    onChange={handleChange}
                    className="mt-2 p-2 rounded-lg border border-[#EFF0F6] focus:outline-none"
                    style={{ fontFamily: "poppins" }}
                  />
                ) : (
                  <p className="txt mt-2" style={{ fontFamily: "poppins" }}>
                    <Text>{productData.response.SeoFriendlyTags.join(", ")}</Text>
                  </p>
                )}
              </div>
            )}

          <div className="bg-white shadow-lg rounded-lg border border-[#EFF0F6] mt-8 p-6">
            <p
              className="font-semibold text-lg text-[#263238] mb-4"
              style={{ fontFamily: "poppins" }}
            >
              <Text>AI Recommendations</Text>
            </p>
            <hr className="border border-[#EFF0F6]" />
            <div className="p-4">
              <span className="label">
                <Text>Product Image presentation</Text>
              </span>
              <div className="line" />
              {isEditing ? (
                <textarea
                  name="response.ProductPrompt"
                  value={productData.response.ProductPrompt}
                  onChange={handleChange}
                  className="mt-2 p-2 rounded-lg border border-[#EFF0F6] focus:outline-none w-full"
                  style={{ fontFamily: "poppins" }}
                />
              ) : (
                <p className="txt mt-2" style={{ fontFamily: "poppins" }}>
                  <Text>{productData.response.ProductPrompt}</Text>
                </p>
              )}
            </div>

            {productData.response.MarketPainPoints &&
              productData.response.MarketPainPoints.length > 0 && (
                <div className="p-4 mt-4">
                  <span className="label">
                    <Text>Market Painpoints</Text>
                  </span>
                  <div className="line" />
                  {isEditing ? (
                    <textarea
                      name="response.MarketPainPoints"
                      value={productData.response.MarketPainPoints}
                      onChange={handleChange}
                      className="mt-2 p-2 rounded-lg border border-[#EFF0F6] focus:outline-none w-full"
                      style={{ fontFamily: "poppins" }}
                    />
                  ) : (
                    <ul>
                      {productData.response.MarketPainPoints.map(
                        (data, index) => {
                          return (
                            <li
                              key={index}
                              className="txt mt-2"
                              style={{ fontFamily: "poppins" }}
                            >
                              <Text>{data}</Text>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  shadowComp: {
    boxShadow: "0px 4.43px 14.18px 0px rgba(8, 15, 52, 0.06)",
    borderRadius: 18,
    borderColor: "#EFF0F6",
    borderWidth: 0.8,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 10,
  },
  slideImgCont: {
    width: "6.5rem",
    height: "6.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#EFF0F6",
    borderWidth: 1.2,
    borderStyle: "solid",
  },
  slideImg: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
};

export default LivePage;
