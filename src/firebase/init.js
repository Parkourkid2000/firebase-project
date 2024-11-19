// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH9V9MCK_T9oVUWTFDP0KRNSjk2tcvlwc",
  authDomain: "fir-practice-efdf5.firebaseapp.com",
  projectId: "fir-practice-efdf5",
  storageBucket: "fir-practice-efdf5.firebasestorage.app",
  messagingSenderId: "679943224299",
  appId: "1:679943224299:web:f01000ea85bd278595f7ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();