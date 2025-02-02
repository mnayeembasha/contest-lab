import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDCcguxar0TVQ7YpFwttTPbZ0xtF02FrzY",
	authDomain: "humangenx.firebaseapp.com",
	projectId: "humangenx",
	storageBucket: "humangenx.firebasestorage.app",
	messagingSenderId: "391038666866",
	appId: "1:391038666866:web:85e330f6d19d20a7941aeb"
  }

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, app, firebaseConfig };
