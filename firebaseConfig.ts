// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB7jz6eXcUT-vvMlW-vHVXlIVUBmetN9M",
  authDomain: "cursor-tutorial.firebaseapp.com",
  projectId: "cursor-tutorial",
  storageBucket: "cursor-tutorial.appspot.com",
  messagingSenderId: "1031207153751",
  appId: "1:1031207153751:web:6d55f4e562446b948ff312",
  measurementId: "G-W6CBWZW4F8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics
const analytics = getAnalytics(app);

console.log("Firebase initialized");