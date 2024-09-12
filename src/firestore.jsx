import React, { useState, useEffect } from "react";
import generateDummydData from "./utils/generateDummy";

import {
  doc,
  addDoc,
  collection,
  updateDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import firestore from "./firebaseconfig";

const Firestore = () => {
  const [data, setData] = useState([]);
  const getTodayOrders = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day

    const startTimestamp = Timestamp.fromDate(today);
    const endTimestamp = Timestamp.fromDate(new Date()); // Current time

    const q = query(
      collection(firestore, "orders"),
      where("timestamp", ">=", startTimestamp),
      where("timestamp", "<=", endTimestamp)
    );

    const querySnapshot = await getDocs(q);
    setData(querySnapshot.docs.map((doc) => doc.data()));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });


  };

  const getOrdersByDateRange = async (startDate, endDate) => {
    const startTimestamp = Timestamp.fromDate(new Date(startDate));
    const endTimestamp = Timestamp.fromDate(new Date(endDate));
  
    const q = query(
      collection(firestore, "orders"),
      where("timestamp", ">=", startTimestamp),
      where("timestamp", "<=", endTimestamp)
    );
  
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());
    // setData(querySnapshot.docs.map((doc) => doc.data()));
    setData(data);
    console.log("sorted data",data);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  useEffect(() => {
    // getTodayOrders();
    getOrdersByDateRange("2024-09-08", "2024-09-09");
  }, []);
  return (
    <div>
      <h1>Firestore</h1>

      <div>
        {data?.map((item) => {
          return (
            <div style={{ color: "black" }} key={item.upk}>
              <h3>{item.customer_name}</h3>
              <p>{item.product_name}</p>
              <p>{item.orderedOn}</p>
            </div>
          );
        })}{" "}
      </div>

      {/* <button onClick={getTodayOrders}>Add Dummy Orders</button> */}
    </div>
  );
};

export default Firestore;
// const [phoneNumber, setPhoneNumber] = useState("");
// const [countryCode, setCountryCode] = useState("+91");
// const [otp, setOtp] = useState("");
// const [generatedOtp, setGeneratedOtp] = useState("");
// const [isAuthenticated, setIsAuthenticated] = useState(false); // To track user authentication status

// const countryCodes = [
//   { code: "+91", country: "India" },
//   { code: "+1", country: "USA" },
//   { code: "+44", country: "UK" },
//   { code: "+61", country: "Australia" },
//   { code: "+81", country: "Japan" },
//   // Add more countries and their codes as needed
// ];

// const sendWhatsAppOtp = async (phoneNumber, otpCode) => {
//   const phone_number_id = "366490143206901";
//   const access_token =
//     "EAALqsiz91T0BO3LnVYr9PcwtAjCYrUZAvRTPG9L8xpjyRi8GWZAMs8cpNDDZCIDNabiCxiaM3Svm1ECysnRm2ZCI10J4bZAIT955mXsXFzyLZBgaTQrYOmOzyL5e38rUm9bAl0asiCGRqU0bhpNAJCHib4CFGZAZCA4gcDZBKwQ3ZB9TGAZB4dYMUoBT0lpoQbeBuZBcM59HBDuZCMXbbkm4SXnQZD"; // Replace with your access token

//   const url = `https://graph.facebook.com/v20.0/${phone_number_id}/messages`;

//   const data = {
//     messaging_product: "whatsapp",
//     recipient_type: "individual",
//     to: phoneNumber,
//     type: "template",
//     template: {
//       name: "otpauth",
//       language: {
//         code: "en",
//       },
//       components: [
//         {
//           type: "body",
//           parameters: [
//             {
//               type: "text",
//               text: otpCode,
//             },
//           ],
//         },
//         {
//           type: "button",
//           sub_type: "URL",
//           index: "0",
//           parameters: [
//             {
//               type: "text",
//               text: otpCode,
//             },
//           ],
//         },
//       ],
//     },
//   };

//   try {
//     const response = await axios({
//       method: "post",
//       url: url,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${access_token}`,
//       },
//       data: data,
//     });
//     console.log("OTP Sent Successfully:", response.data);
//   } catch (error) {
//     console.error(
//       "Error sending OTP:",
//       error.response ? error.response.data : error.message
//     );
//   }
// };

// const generateOtp = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// const sendOtp = async () => {
//   const otpCode = generateOtp();
//   setGeneratedOtp(otpCode); // Store the generated OTP for verification
//   const fullPhoneNumber = countryCode + phoneNumber;

//   try {
//     await sendWhatsAppOtp(fullPhoneNumber, otpCode);
//     console.log("OTP code:", otpCode);
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//   }
// };

// const verifyOtp = () => {
//   if (otp === generatedOtp) {
//     setIsAuthenticated(true); // Mark the user as authenticated if OTP matches
//     addUserData();
//     console.log("OTP Verified! User logged in.");
//   } else {
//     setIsAuthenticated(false);
//     console.error("Invalid OTP");
//   }
// };
