// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPJfkxmnBb4P-h9B5KktQhy_ghcJNpeHY",
  authDomain: "chitchat-852bf.firebaseapp.com",
  projectId: "chitchat-852bf",
  storageBucket: "chitchat-852bf.appspot.com",
  messagingSenderId: "544286709865",
  appId: "1:544286709865:web:15110e2c2f127b63ba6af8"
};

// Initialize Firebase
//Auth part
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
//Database part
export const db = getFirestore(app);
