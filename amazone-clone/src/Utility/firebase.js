// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4DJg66dHwJVVNtyxF9Q9bhTmHK7JmyXE",
  authDomain: "clone-2024-c5db0.firebaseapp.com",
  projectId: "clone-2024-c5db0",
  storageBucket: "clone-2024-c5db0.firebasestorage.app",
  messagingSenderId: "270353783716",
  appId: "1:270353783716:web:c4ff4d8ce9f21fa691ff31"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
      
export const auth = getAuth(app)
export const db = app.firestore()