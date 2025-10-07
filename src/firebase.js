// Import zaroori functions Firebase libraries se
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Yeh aapka Firebase configuration object hai.
// Isko KAHIN AUR SHARE NA KAREIN. Yeh secret hai.
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwDtoGdImAV0e2IGPHxrQCULsAte6-y5c",
  authDomain: "my-portfolio-db-35df7.firebaseapp.com",
  projectId: "my-portfolio-db-35df7",
  storageBucket: "my-portfolio-db-35df7.firebasestorage.app",
  messagingSenderId: "282476859701",
  appId: "1:282476859701:web:af3374ca1b649a1fd8fc7c",
  measurementId: "G-9QVZ579421"
};

// Firebase app ko in settings ke saath initialize (shuru) karein
const app = initializeApp(firebaseConfig);

// Authentication service ko export karein taaki hum login/logout kar sakein
export const auth = getAuth(app);

// Firestore database service ko export karein taaki hum data padh aur likh sakein
export const db = getFirestore(app);

