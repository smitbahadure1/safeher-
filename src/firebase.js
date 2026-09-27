import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnt85TUMhXwW7YyI6sA1vCMsjcS1IuEdk",
  authDomain: "safe-her-d81f5.firebaseapp.com",
  projectId: "safe-her-d81f5",
  storageBucket: "safe-her-d81f5.firebasestorage.app",
  messagingSenderId: "815151275872",
  appId: "1:815151275872:web:747ec5d2e190a053840805",
  measurementId: "G-6WLB2Y6FH7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
