// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdXH8fR4jKZAq0fjgwwpUi2QpXvcuqvm0",
  authDomain: "chatterbox-1d6a2.firebaseapp.com",
  projectId: "chatterbox-1d6a2",
  storageBucket: "chatterbox-1d6a2.appspot.com",
  messagingSenderId: "641495862861",
  appId: "1:641495862861:web:cd378cd62c820de43b1604"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();