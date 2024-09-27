// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCGqHnL-bTKHWxyRnnKe_zZxrKV6gVyIU4",
  authDomain: "choice-up-6569d.firebaseapp.com",
  projectId: "choice-up-6569d",
  storageBucket: "choice-up-6569d.appspot.com",
  messagingSenderId: "451760749637",
  appId: "1:451760749637:web:09fd538096327bae0df72c"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Initialize Auth
const db = getFirestore(app);  // Initialize Firestore
const storage = getStorage(app); // Initialize Storage

export { auth, db, storage };