import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChumYSgP64QwZKSDKJ9147phLyWK47RwA",
  authDomain: "discord-clone-udemy-7e147.firebaseapp.com",
  projectId: "discord-clone-udemy-7e147",
  storageBucket: "discord-clone-udemy-7e147.firebasestorage.app",
  messagingSenderId: "840095573218",
  appId: "1:840095573218:web:bb462a4ed86c5e0891aabb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };