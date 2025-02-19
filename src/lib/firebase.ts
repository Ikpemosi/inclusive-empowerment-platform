
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA56evcRviGI6nO87XAKyIDKwus-LiwyX0",
  authDomain: "idea-ngo-dev.firebaseapp.com",
  projectId: "idea-ngo-dev",
  storageBucket: "idea-ngo-dev.firebasestorage.app",
  messagingSenderId: "564861791185",
  appId: "1:564861791185:web:4fa7db151689f82f038ef0",
  measurementId: "G-B9KF60R9VH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
