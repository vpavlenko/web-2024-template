import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBB7jz6eXcUT-vvMlW-vHVXlIVUBmetN9M",
  authDomain: "cursor-tutorial.firebaseapp.com",
  projectId: "cursor-tutorial",
  storageBucket: "cursor-tutorial.appspot.com",
  messagingSenderId: "1031207153751",
  appId: "1:1031207153751:web:6d55f4e562446b948ff312",
  measurementId: "G-W6CBWZW4F8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

console.log("Firebase initialized");