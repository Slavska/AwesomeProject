import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0TL40ZgvxH2S1U4hduEeMQDmL1CuWjT0",
  authDomain: "awesomeprojectc.firebaseapp.com",
  projectId: "awesomeprojectc",
  storageBucket: "awesomeprojectc.appspot.com",
  messagingSenderId: "882158939387",
  appId: "1:882158939387:web:402b5d4a46c9d1b67ad45e",
  measurementId: "G-WV28M2RN1J",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
