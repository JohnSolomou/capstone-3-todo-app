import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2umTJJHOhcMuLJyPdtnttliBEiJICCH4",
  authDomain: "auth-fb-ar.firebaseapp.com",
  databaseURL: "https://auth-fb-ar-default-rtdb.firebaseio.com",
  projectId: "auth-fb-ar",
  storageBucket: "auth-fb-ar.appspot.com",
  messagingSenderId: "1083878760713",
  appId: "1:1083878760713:web:5fdc8d1f382b2820cd73d8",
};

export const app = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export default firestore;
