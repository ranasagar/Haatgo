
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
let app: FirebaseApp | undefined;
let auth: Auth | undefined;

// Check if the API key is provided before initializing
if (firebaseConfig.apiKey) {
    if (typeof window !== "undefined" && !getApps().length) {
        try {
            app = initializeApp(firebaseConfig);
            auth = getAuth(app);
        } catch (e) {
            console.error("Firebase initialization error", e);
        }
    } else if (getApps().length) {
        app = getApp();
        auth = getAuth(app);
    }
} else {
    console.warn("Firebase API key is not provided. Firebase will not be initialized.");
}


export { app, auth };
