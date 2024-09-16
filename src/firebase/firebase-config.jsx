// firebase-config.jsx
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGqHnL-bTKHWxyRnnKe_zZxrKV6gVyIU4",
  authDomain: "choice-up-6569d.firebaseapp.com",
  projectId: "choice-up-6569d",
  storageBucket: "choice-up-6569d.appspot.com",
  messagingSenderId: "451760749637",
  appId: "1:451760749637:web:09fd538096327bae0df72c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, collection, addDoc, storage, ref, uploadBytes, getDownloadURL };
