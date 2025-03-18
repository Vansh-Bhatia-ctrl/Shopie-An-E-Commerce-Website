import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDv4zqtQsp1m1fLJyriG7Xxs0Fu1c51j3o",
  authDomain: "shopie-94f6e.firebaseapp.com",
  databaseURL: "https://shopie-94f6e-default-rtdb.firebaseio.com",
  projectId: "shopie-94f6e",
  messagingSenderId: "1054970844458",
  appId: "1:1054970844458:web:90ac17e005efadc26c7a53",
  measurementId: "G-T0P0TJKNJF",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
