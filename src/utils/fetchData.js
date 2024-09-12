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
import firestore from "../firebaseconfig";
import axios from "axios";

const getOrdersByDateRange = async (startDate, endDate, setData) => {
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
  //   console.log("sorted data", data);

  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //   });
};

const fetchAnswers = async (query) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/ask",
      // "http://ec2-3-86-240-66.compute-1.amazonaws.com/ask",
      {
        question: query,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.answer;
  } catch (error) {
    console.error(
      "Error querying API:",
      error.response ? error.response.data : error.message
    );
    //   return error.message;
  }
};

// Function to classify the query
const queryClassification = async (query) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/classify",
      {
        query: query,
        variables: {},
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Parsing the crucial string data to json
    const rawString = response.data;
    let jsonString = rawString.replace(/'/g, '"');
    jsonString = jsonString.replace(/(\w+):/g, '"$1":');
    console.log(jsonString);

    try {
      const parsedData = JSON.parse(jsonString);
      console.log(parsedData);
      const data = {
        type: "dynamic",
        data: {
          intent: "orders",
          timePeriod: {
            startDate: "2024-09-07",
            endDate: "2024-09-12",
          },
        },
      };

      return parsedData;

      // if (
      //   parsedData.type === "dynamic" &&
      //   parsedData.data.intent === "orders"
      // ) {
      //   getOrdersByDateRange(
      //     parsedData.data.timePeriod.startDate,
      //     parsedData.data.timePeriod.endDate,
      //     setData
      //   );
      // }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  } catch (error) {
    console.error(
      "Error classifying query:",
      error.response ? error.response.data : error.message
    );
  }
};

export { getOrdersByDateRange, fetchAnswers, queryClassification };
