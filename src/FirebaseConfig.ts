// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDArakNWaeMlx6hE1ah5Zxnw3IW-Ol630",
  authDomain: "pepsigame-fbd6f.firebaseapp.com",
  projectId: "pepsigame-fbd6f",
  storageBucket: "pepsigame-fbd6f.appspot.com",
  messagingSenderId: "230501052629",
  appId: "1:230501052629:web:00fc222d3c6b658bfdb25c",
  measurementId: "G-0QR741LXYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);