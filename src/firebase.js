import { initializeApp } from 'firebase/app'; // Import initializeApp from firebase/app
import { getAuth } from 'firebase/auth'; // Import getAuth from firebase/auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4gudbuU01ULPQshDnfP-qL6--4G1djiw",
  authDomain: "vinyl-shop-c6f83.firebaseapp.com",
  projectId: "vinyl-shop-c6f83",
  storageBucket: "vinyl-shop-c6f83.appspot.com",
  messagingSenderId: "578455814429",
  appId: "1:578455814429:web:a5f7bbd18a707193ad21f4",
  measurementId: "G-F5Q7KXB6N4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Use getAuth to initialize authentication
export default app;
