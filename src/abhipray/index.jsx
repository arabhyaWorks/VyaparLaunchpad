import React, { useState, useEffect } from "react";
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

const Abhipray = () => {
  useEffect(() => {}, []);
  return (
    <div>
      <h1>Abhipray</h1>
      this is swaroop
    </div>
  );
};

export default Abhipray;
