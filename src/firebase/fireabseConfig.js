import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBfrc7-_Ph0WrSNOX_-x-5uHrRZmoChFy8",
  authDomain: "ques-portal.firebaseapp.com",
  projectId: "ques-portal",
  storageBucket: "ques-portal.appspot.com",
  messagingSenderId: "889395292321",
  appId: "1:889395292321:web:4e28d62c4541179071a8e0"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
