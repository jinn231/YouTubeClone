// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh1RN4e8nC2Bqxg_4hsxCGwBifT0MAjrI",
  authDomain: "ytdb-e7fcc.firebaseapp.com",
  projectId: "ytdb-e7fcc",
  storageBucket: "ytdb-e7fcc.appspot.com",
  messagingSenderId: "258706852934",
  appId: "1:258706852934:web:a6b4c07ad2e38f12100e47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()


export default app;