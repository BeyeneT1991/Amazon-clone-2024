// // Import the functions you need from the SDKs you need
// import firebase from "firebase/compat/app";
// import {getAuth} from "firebase/auth"
// import "firebase/compat/firestore"
// import "firebase/compat/auth"
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB4DJg66dHwJVVNtyxF9Q9bhTmHK7JmyXE",
//   authDomain: "clone-2024-c5db0.firebaseapp.com",
//   projectId: "clone-2024-c5db0",
//   storageBucket: "clone-2024-c5db0.firebasestorage.app",
//   messagingSenderId: "270353783716",
//   appId: "1:270353783716:web:c4ff4d8ce9f21fa691ff31"
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
      
// export const auth = getAuth(app)
// export const db = app.firestore()







import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBGwPcKBTjG6HQ1LSa2UZ33dxtLUJ2ZgUI",
  authDomain: "e-clone-2024-cdb26.firebaseapp.com",
  projectId: "e-clone-2024-cdb26",
  storageBucket: "e-clone-2024-cdb26.firebasestorage.app",
  messagingSenderId: "166742604950",
  appId: "1:166742604950:web:8467b00b9ba23fd2ad96b7",
  measurementId: "G-HMETCLHW98"
};


const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = app.firestore()