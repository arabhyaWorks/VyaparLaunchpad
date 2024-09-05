// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL1jEgbfcSYJp-F1G2p66F_QqasiVYzQk",
  authDomain: "vyaparlaunchpad.firebaseapp.com",
  projectId: "vyaparlaunchpad",
  storageBucket: "vyaparlaunchpad.appspot.com",
  messagingSenderId: "1032680096501",
  appId: "1:1032680096501:web:4f05561e36f4db72aebbbc",
  measurementId: "G-EKTDTN2F6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export default firestore;
