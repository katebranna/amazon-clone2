import firebase from "firebase";

const firebaseConfig = {
    apiKey: "",
    authDomain: "clone-82b31.firebaseapp.com",
    databaseURL: "https://clone-82b31.firebaseio.com",
    projectId: "clone-82b31",
    storageBucket: "clone-82b31.appspot.com",
    messagingSenderId: "929624818105",
    appId: "1:929624818105:web:0b24c32ad25d801e963668",
    measurementId: "G-FD3RDFL5K7"
  };

//intialize the firebase app
const firebaseApp = firebase.initializeApp(firebaseConfig);

//initialize the database (firestore is the real-time database from firebase)
const db = firebaseApp.firestore();
const auth = firebase.auth();

//to use these things outside of this file
export { db, auth };