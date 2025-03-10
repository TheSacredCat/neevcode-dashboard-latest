// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC_eJZw_hxmnsV8h8YfpRsGqXN-t41VvY",
  authDomain: "neevcode-admin.firebaseapp.com",
  projectId: "neevcode-admin",
  storageBucket: "neevcode-admin.appspot.com", // ✅ Fixed this
  messagingSenderId: "385541305150",
  appId: "1:385541305150:web:a371e14e016f0ec683f26f",
  measurementId: "G-VR88LYNDWD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
