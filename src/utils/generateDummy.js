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

const orders = [
  {
    pid: "H027JZDTrnP7N4daXBbT",
    sid: "+919452624111",
    status: "dispatched",
    quantity: 1,
    total: 1000,
    payment: "online",
    delivery_address: "123 Market Street, Varanasi",
    // customer_name: "Rahul",
    phone_number: "+919876543210",
  },
  // Add more order objects with varying details if needed
];

const names = [
  "Rahul",
  "Neha",
  "Amit",
  "Sneha",
  "Vikram",
  "Riya",
  "Karan",
  "Nisha",
  "Ravi",
  "Priya",
];

const products = [
  "Modern gamla",
  "Mitti ka Bottle",
  "Katan Saree",
  "launglata",
  "samsung TV",
  "Designer diya for diwali",
  "godrej almirah",
  "sony headphones",
  "samsung mobile",
  "apple laptop",
];

const generateDummyOrders = () => {
  const ordersWithTimestamps = [];

  for (let i = 0; i < 10; i++) {
    // Create random past timestamps
    const date = new Date();
    date.setDate(date.getDate() - i); // Go back 'i' days

    // Format the timestamp to "dd/mm/yyyy hh:mm:ss"
    const orderedOn = date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    ordersWithTimestamps.push({
      ...orders[0], // Use the same order template
      timestamp: Timestamp.fromDate(date), // Set dynamic timestamp
      orderedOn, // Formatted date-time
      customer_name: names[i], // Assign random names
    });
  }

  return ordersWithTimestamps;
};

function getRandomInteger() {
  return Math.floor(Math.random() * 10);
}

const generateDummydData = async () => {
  // generating dummy data for orders with different tmestamps for sorting
  const dummyOrders = generateDummyOrders(); // Generate orders with timestamps
  try {
    var count = 0;

    for (var i = 0; i < dummyOrders.length; i++) {
      for (var j = 0; j < getRandomInteger(); j++) {
        const docRef = await addDoc(collection(firestore, "orders"), {
          ...dummyOrders[i],
          customer_name: names[getRandomInteger()],
          product_name: products[getRandomInteger()],
        });
        await updateDoc(doc(firestore, "orders", docRef.id), {
          upk: docRef.id,
        });

        count = count + j;
      }
    }

    console.log("Orders added successfully!", count);
  } catch (error) {
    console.error("Error writing user data: ", error);
  }
};

export default generateDummydData;
