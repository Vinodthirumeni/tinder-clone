import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBEe5OfcEwW9fIwAiB9nXHuS6yzLxOaue4",
  authDomain: "tinder-clone-cfa43.firebaseapp.com",
  databaseURL: "https://tinder-clone-cfa43.firebaseio.com",
  projectId: "tinder-clone-cfa43",
  storageBucket: "tinder-clone-cfa43.appspot.com",
  messagingSenderId: "47754754644",
  appId: "1:47754754644:web:3875e103fad1eecd50cbc1",
  measurementId: "G-G8KBPB0GVC",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export default db;
