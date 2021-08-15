import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxfrL-pSWzDPDcyViF-6tiXuHog_EqMGs",
  authDomain: "g-docs-clone-17f7c.firebaseapp.com",
  projectId: "g-docs-clone-17f7c",
  storageBucket: "g-docs-clone-17f7c.appspot.com",
  messagingSenderId: "102035963675",
  appId: "1:102035963675:web:0b574209ed27f3e8139dbe",
  measurementId: "G-3TTM5C0WKP",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
