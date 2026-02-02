// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDheHi8xr6oJNmPiaW96E8Vb_szt63YNEc",
    authDomain: "ai-job-flow.firebaseapp.com",
    projectId: "ai-job-flow",
    storageBucket: "ai-job-flow.firebasestorage.app",
    messagingSenderId: "110144059208",
    appId: "1:110144059208:web:8cbe51bc58cc4ee775657d",
    measurementId: "G-9VXSRB8L0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default app;
