import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCDv0vhkZdqTJr8Me27gMmw9SmBQs-AOZ0",
    authDomain: "vue-blog-project-83ab0.firebaseapp.com",
    projectId: "vue-blog-project-83ab0",
    storageBucket: "vue-blog-project-83ab0.appspot.com",
    messagingSenderId: "814835927158",
    appId: "1:814835927158:web:6c686ea230b5bf3639b757"
  };
  const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };