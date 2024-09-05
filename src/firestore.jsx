import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import firestore from "./firebaseconfig";
import axios from "axios";

const Firestore = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // To track user authentication status

  const countryCodes = [
    { code: "+91", country: "India" },
    { code: "+1", country: "USA" },
    { code: "+44", country: "UK" },
    { code: "+61", country: "Australia" },
    { code: "+81", country: "Japan" },
    // Add more countries and their codes as needed
  ];

  const sendWhatsAppOtp = async (phoneNumber, otpCode) => {
    const phone_number_id = "366490143206901";
    const access_token =
      "EAALqsiz91T0BOZCTo2jRQYg0pSQO4UrL08vdXSD9oH3mHYmTrOFgPvIqQrB9e2acSamYByDoQsfOlZASw43TiDT7mRocPnZCuRPgBT1MnGYmPZAFbwHOlw68Rf4lYvsjBjXoJRJyCNZAFfq8DWjBJPMjyvkMCUlqaFhiqDrbx8KeQDG9LNEP8f1l0l0cfnquei6aiKL0gLwlc1oYdGxIZD"; // Replace with your access token

    const url = `https://graph.facebook.com/v20.0/${phone_number_id}/messages`;

    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phoneNumber,
      type: "template",
      template: {
        name: "otpauth",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: otpCode,
              },
            ],
          },
          {
            type: "button",
            sub_type: "URL",
            index: "0",
            parameters: [
              {
                type: "text",
                text: otpCode,
              },
            ],
          },
        ],
      },
    };

    try {
      const response = await axios({
        method: "post",
        url: url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        data: data,
      });
      console.log("OTP Sent Successfully:", response.data);
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOtp = async () => {
    const otpCode = generateOtp();
    setGeneratedOtp(otpCode); // Store the generated OTP for verification
    const fullPhoneNumber = countryCode + phoneNumber;

    try {
      await sendWhatsAppOtp(fullPhoneNumber, otpCode);
      console.log("OTP code:", otpCode);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setIsAuthenticated(true); // Mark the user as authenticated if OTP matches
      addUserData();
      console.log("OTP Verified! User logged in.");
    } else {
      setIsAuthenticated(false);
      console.error("Invalid OTP");
    }
  };

  const addUserData = async () => {
    const fullPhoneNumber = countryCode + phoneNumber;

    try {
      await setDoc(doc(firestore, "users", fullPhoneNumber), {
        name: "John Doe",
        phone_number: fullPhoneNumber,
        shop_name: "John's Electronics",
        address: "123 Market Street, Mumbai",
        company_name: "John Electronics Pvt. Ltd.",
        aadhar_number: "1234-5678-9123",
        pan_card_number: "ABCDE1234F",
        gstin: "27ABCDE1234F1Z5",
        bank_details: {
          account_holder_name: "John Doe",
          account_number: "123456789012",
          bank_name: "ABC Bank",
          ifsc_code: "ABC1234567",
        },
        documents: {
          aadhar_document_url: "https://firebase.storage/aadhar.png",
          pan_card_document_url: "https://firebase.storage/pan_card.png",
          shop_address_proof_url: "https://firebase.storage/address_proof.png",
          gst_certificate_url: "https://firebase.storage/gst_certificate.png",
          cancelled_cheque_url: "https://firebase.storage/cancelled_cheque.png",
        },
        products: [],
      });

      console.log("User data successfully written to Firestore!");
    } catch (error) {
      console.error("Error writing user data: ", error);
    }

    
  };

  return (
    <div>
      <h1>Firestore</h1>
      <div>
        <label>Country Code: </label>
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        >
          {countryCodes.map((item) => (
            <option key={item.code} value={item.code}>
              {item.country} ({item.code})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Phone Number: </label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />
      </div>
      <button onClick={sendOtp}>send otp</button>
      <div>
        <label>OTP: </label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <button onClick={verifyOtp}>Verify OTP</button>
      </div>
    </div>
  );
};

export default Firestore;
