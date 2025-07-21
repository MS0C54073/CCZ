// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  "projectId": "career-compass-x1f43",
  "appId": "1:453008602434:web:f41c0dc612a36d83da84db",
  "storageBucket": "career-compass-x1f43.firebasestorage.app",
  "apiKey": "AIzaSyBqQCDIr1hQd2dVL7B7mUW7a6Z7qOgKgYc",
  "authDomain": "career-compass-x1f43.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "453008602434"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// const messaging = getMessaging(app);

export { app, auth, db, storage };
