import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMgz4lVZUuPC5Q9sBdClOfRasopP-064o",
  authDomain: "ques-portal.firebaseapp.com",
  projectId: "ques-portal",
  storageBucket: "ques-portal.appspot.com",
  messagingSenderId: "889395292321",
  appId: "1:889395292321:web:4e28d62c4541179071a8e0",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
