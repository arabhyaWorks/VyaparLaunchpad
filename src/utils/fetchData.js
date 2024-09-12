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

export { getOrdersByDateRange, fetchAnswers };
