import React, { useState } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import firestore from "./firebaseconfig";
import axios from "axios";

const photoRoomApi = "sandbox_bf94ab81f439e8cc7c75b8e42607c85d9d4345d5";


const productData = {
  inputLanguage: "english",
  shopName: "Ajay shop",
  sellerState: "",
  productlanguage: "NElgish",
  productCategory: "Textile",
  productTitle: "Earthen Water bottle",
  pricing: "12000",
  quantity: "124",
  productDescription:
    "Stay refreshed and eco-conscious with this beautifully handcrafted Earthen Water Bottle. Made from natural clay, this bottle is designed to keep your water cool while retaining the earthy freshness that comes from drinking from clay. The porous nature of the earthen material ensures natural cooling, offering a refreshing experience even on the hottest days.\n",
  productVariation:
    "\t1.\tClassic Earthen Bottle:\n\t•\tCapacity: 1L\n\t•\tFeatures: Natural cooling, simple design.\n\t2.\tBottle with Matching Cup:\n\t•\tCapacity: 1L + 200ml cup\n\t•\tFeatures: Great for serving with style.\n\t3.\tHand-Painted Bottle:\n\t•\tCapacity: 1L\n\t•\tFeatures: Decorative, artistic touch.\n\t4.\tInsulated Earthen Bottle:\n\t•\tCapacity: 1L\n\t•\tFeatures: Insulated sleeve for extra cooling.\n\t5.\tPersonalized Bottle:\n\t•\tCapacity: 1L\n\t•\tFeatures: Custom engraving for names or quotes.",
  response: {
    ProductRegionalNames: [
      "Mitti Ki Bottle",
      "Matka Bottle",
      "Kudam Bottles",
      "Mann Pot",
      "Chatti Bottle",
    ],
    ProductName: "Earthen Water Bottle",
    ProductDescription:
      "Stay refreshed and eco-conscious with our beautifully handcrafted Earthen Water Bottle. Made from natural clay, this bottle is designed to keep your water cool while retaining the earthy freshness that comes from drinking from clay. The porous nature of the earthen material ensures natural cooling, offering a refreshing experience even on the hottest days.",
    ProductVariation: [
      {
        VariationName: "Classic Earthen Bottle",
        Capacity: "1L",
        Features: ["Natural cooling", "Simple design"],
      },
      {
        VariationName: "Bottle with Matching Cup",
        Capacity: "1L + 200ml cup",
        Features: ["Great for serving with style"],
      },
      {
        VariationName: "Hand-Painted Bottle",
        Capacity: "1L",
        Features: ["Decorative", "Artistic touch"],
      },
      {
        VariationName: "Insulated Earthen Bottle",
        Capacity: "1L",
        Features: ["Insulated sleeve for extra cooling"],
      },
      {
        VariationName: "Personalized Bottle",
        Capacity: "1L",
        Features: ["Custom engraving for names or quotes"],
      },
    ],
    AboutProduct: [
      "Eco-friendly and handmade using 100% natural clay.",
      "Provides natural cooling due to the porous nature of clay.",
      "Easy to clean and refill.",
      "Enhances the taste of water by adding a unique earthy flavor.",
      "Health benefits include balancing pH levels and boosting metabolism.",
      "Soothes the throat and prevents sunstrokes.",
      "Durable and aesthetic with variations available.",
      "Free from harmful chemicals, non-toxic, and unglazed.",
      "Promotes traditional and sustainable lifestyle choices.",
      "Cost-effective and provides value for money.",
    ],
    ProductTagline: "Naturally Cool, Purely Refreshing.",
    ProductPrompt:
      "Transform your product photos into professional e-commerce images by showcasing the elegant design and natural cooling benefits of our Earthen Water Bottles. Highlight the handcrafted details and unique variations for an appealing presentation.",
    MarketPainPoints: [
      "Lack of awareness about the health benefits of clay water bottles.",
      "Competition from modern water bottles and other eco-friendly options.",
      "Perceived difficulty in maintenance and cleaning.",
      "Higher price point compared to plastic and metal bottles.",
      "Limited availability in mainstream retail stores.",
    ],
    CustomerAcquisition: [
      "Leverage social media platforms to educate and engage potential customers.",
      "Collaborate with eco-friendly influencers for product endorsements.",
      "Offer discounts and combo deals to attract cost-conscious buyers.",
      "Participate in eco-friendly fairs and events to increase brand visibility.",
      "Implement a referral program to encourage word-of-mouth marketing.",
    ],
    MarketEntryStrategy: [
      "Start with an online presence through a dedicated website and major e-commerce platforms.",
      "Target eco-conscious consumers with focused advertising on sustainability.",
    ],
    SeoFriendlyTags: [
      "Clay Water Bottle",
      "Earthen Water Bottle",
      "Natural Cooling Bottle",
      "Eco-Friendly Water Bottle",
      "Handmade Clay Bottle",
      "Mitti Water Bottle",
      "Terracotta Water Bottle",
      "Healthy Drinking Bottle",
      "Traditional Water Bottle",
      "Sustainable Water Bottle",
    ],
    newImages: [null, null, null],
  },
  companyLogo: "",
  images: [
    "https://vyaparbackend.s3.amazonaws.com/uploads/image3.jpg",
    "https://vyaparbackend.s3.amazonaws.com/uploads/image2.jpeg",
    "https://vyaparbackend.s3.amazonaws.com/uploads/img1.jpg",
  ],
  prompt:
    "Please change the background of the input Image such that they are Ecommerce ready. The product is called Earthen Water bottle",
};

const ProductUpload = () => {
    const uploadProduct = async () => {
      const data = {
        name: productData.response.ProductName || "Unknown Product",
        category: productData.productCategory || "Uncategorized", // Set default if undefined
        pricing: productData.pricing || "N/A",
        quantity: productData.quantity || 0,
        tagline: productData.response.ProductTagline || "",
        description: productData.response.ProductDescription || "",
        variation: productData.response.ProductVariation || [],
        images: productData.images.map((image) => {
          return `https://image-api.photoroom.com/v2/edit?background.prompt=${productData.prompt}&background.seed=42&outputSize=1000x1000&padding=0.1&imageUrl=${image}&apiKey=${photoRoomApi}`;
        }),
        about: productData.response.AboutProduct || [],
        marketPainPoints: productData.response.MarketPainPoints || [],
        customerAcquisition: productData.response.CustomerAcquisition || [],
        marketEntryStrategy: productData.response.MarketEntryStrategy || [],
        seoFriendlyTags: productData.response.SeoFriendlyTags || [],
        regionalNames: productData.response.ProductRegionalNames || [],
        sellerId: "+919452624111",
        createdAt: new Date(),
      };
  
      console.log("Product data to be uploaded:", data);
  
      try {
        // First, create the document and get the generated ID
        const docRef = await addDoc(collection(firestore, "products"), data);
  
        // Now, update the document with the unique product key (upk)
        await updateDoc(doc(firestore, "products", docRef.id), {
          upk: docRef.id,
        });
  
        console.log(
          "Product successfully written to Firestore with ID:",
          docRef.id
        );
      } catch (error) {
        console.error("Error writing product data: ", error);
      }
    };
    return (
      <div>
        <h1>this is data</h1>
        <button onClick={uploadProduct}>Upload Product</button>
      </div>
    );
  };
  
  export default ProductUpload;


  