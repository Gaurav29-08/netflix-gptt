// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHPC-bGcHh-gQE8y2Etwy9hDgPXjZAtxU",
  authDomain: "netflixgpt-b7f9d.firebaseapp.com",
  projectId: "netflixgpt-b7f9d",
  storageBucket: "netflixgpt-b7f9d.appspot.com",
  messagingSenderId: "124793186561",
  appId: "1:124793186561:web:c6915ad1d96c9282d79300",
  measurementId: "G-X9V1ED4R1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();