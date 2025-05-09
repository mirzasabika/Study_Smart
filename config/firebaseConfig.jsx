// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0kds0dvTKA5wB14FykWeDoPImdj3lX_Q",
  authDomain: "study-smart-13d7a.firebaseapp.com",
  projectId: "study-smart-13d7a",
  storageBucket: "study-smart-13d7a.firebasestorage.app",
  messagingSenderId: "731928520247",
  appId: "1:731928520247:web:0dab7e532d90c5b8bf81b2",
  measurementId: "G-8EKY14JXZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
})
export const db=getFirestore(app)
const analytics = getAnalytics(app);