import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "hubisko-21f8a.firebaseapp.com",
  projectId: "hubisko-21f8a",
  storageBucket: "hubisko-21f8a.appspot.com",
  messagingSenderId: "725257325012",
  appId: "1:725257325012:web:b7f54f49eea1ad9b472e41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
