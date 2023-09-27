import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCh_SMBBw77tqGcTAA-ZTSdRkwjxUBaG6I",
  authDomain: "awesomeproject-9d076.firebaseapp.com",
  projectId: "awesomeproject-9d076",
  storageBucket: "awesomeproject-9d076.appspot.com",
  messagingSenderId: "317195312339",
  appId: "1:317195312339:web:287327f183e4a2937ec826",
  measurementId: "G-PFHDN23HN9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
