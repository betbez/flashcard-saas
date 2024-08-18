// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2wztdakAWnYURhYJaU_4YeCFb4Cw-VLQ",
  authDomain: "flashcardsaas-15a02.firebaseapp.com",
  projectId: "flashcardsaas-15a02",
  storageBucket: "flashcardsaas-15a02.appspot.com",
  messagingSenderId: "293970039305",
  appId: "1:293970039305:web:908107c0250aa49fd75ed8",
  measurementId: "G-X6JYL9HYYZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}