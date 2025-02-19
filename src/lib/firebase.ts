
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_gQYhh9lYMERbd0odUSbJIJbLifSAD1g",
  authDomain: "motiwa-online-tests.firebaseapp.com",
  databaseURL: "https://motiwa-online-tests-default-rtdb.firebaseio.com",
  projectId: "motiwa-online-tests",
  storageBucket: "motiwa-online-tests.appspot.com",
  messagingSenderId: "522502389732",
  appId: "1:522502389732:web:224fb4f5f1f5e890a051f1",
  measurementId: "G-FN2NGD1MM5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
