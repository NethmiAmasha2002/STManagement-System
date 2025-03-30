// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKCMcuuogFUjhMA35REzRnv6OGZx0Il5w",
    authDomain: "student-management-syste-2da3b.firebaseapp.com",
    databaseURL: "https://student-management-syste-2da3b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "student-management-syste-2da3b",
    storageBucket: "student-management-syste-2da3b.firebasestorage.app",
    messagingSenderId: "182872396407",
    appId: "1:182872396407:web:467a3dffc974568464ac72",
    measurementId: "G-WDDE96PN1G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export authentication and database instances
export const auth = getAuth(app);
export const database = getDatabase(app);
