// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optio nal
const firebaseConfig = {
  apiKey: "AIzaSyBbl9C_od35p-P06L-rpgQmmEe7GxHdDkE",
  authDomain: "fir-e117a.firebaseapp.com",
  projectId: "fir-e117a",
  storageBucket: "fir-e117a.appspot.com",
  messagingSenderId: "868547871179",
  appId: "1:868547871179:web:b4ad41c955047d4a2b364e",
  measurementId: "G-T8B3SNVKH0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { analytics, auth, googleProvider, db, storage };
