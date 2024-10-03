import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBB7jz6eXcUT-vvMlW-vHVXlIVUBmetN9M",
  authDomain: "cursor-tutorial.firebaseapp.com",
  projectId: "cursor-tutorial",
  storageBucket: "cursor-tutorial.appspot.com",
  messagingSenderId: "1031207153751",
  appId: "1:1031207153751:web:6d55f4e562446b948ff312",
  measurementId: "G-W6CBWZW4F8"
};

let app;
let db;
let auth;

try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase app initialized successfully");

  db = getFirestore(app);
  console.log("Firestore initialized");

  auth = getAuth(app);
  console.log("Auth initialized");

  // Uncomment the following line if you want to use the local emulator
  // connectAuthEmulator(auth, "http://localhost:9099");

  console.log("Firebase initialization complete");
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export { db, auth };