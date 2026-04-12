// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKG8iPsoHXmnhFiGUdRdr6kTIlvD4gf0I",
  authDomain: "dennyskbellos-web.firebaseapp.com",
  projectId: "dennyskbellos-web",
  storageBucket: "dennyskbellos-web.firebasestorage.app",
  messagingSenderId: "941988147521",
  appId: "1:941988147521:web:4b6c25f848adeb88d6b1c0",
  measurementId: "G-7G8D8T41QC"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos la base de datos Firestore para usarla en tus vistas
export const db = getFirestore(app);
export const auth = getAuth(app);