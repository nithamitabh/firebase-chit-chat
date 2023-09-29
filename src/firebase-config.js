// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT1roAMSAU0A4i2svB6hdWRl5qaJFRK7Y",
  authDomain: "simple-chit-chat.firebaseapp.com",
  projectId: "simple-chit-chat",
  storageBucket: "simple-chit-chat.appspot.com",
  messagingSenderId: "999052503210",
  appId: "1:999052503210:web:f3cca4ed2fc5a2959648d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);