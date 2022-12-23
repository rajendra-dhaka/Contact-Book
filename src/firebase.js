// Import the functions we need from the SDKs we need
import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Our web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBakoJujVQf9m5yYawkDOP8ARrRL7Bdpxg",
  authDomain: "contact-book-b4962.firebaseapp.com",
  projectId: "contact-book-b4962",
  storageBucket: "contact-book-b4962.appspot.com",
  messagingSenderId: "846935646333",
  appId: "1:846935646333:web:3a5011e8e03c939a8f1114"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize firebase DB

export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);