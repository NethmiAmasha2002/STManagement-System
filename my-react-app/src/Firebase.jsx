// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

// Connect to Firebase Functions emulator when in development
if (process.env.NODE_ENV === 'development') {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export { app, functions };