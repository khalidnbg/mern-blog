// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-8c88a.firebaseapp.com",
  projectId: "mern-blog-8c88a",
  storageBucket: "mern-blog-8c88a.appspot.com",
  messagingSenderId: "798443864503",
  appId: "1:798443864503:web:03357beb88e77c18856832",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
