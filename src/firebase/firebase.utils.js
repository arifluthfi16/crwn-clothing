import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyCVWEOKbOFkz6NXJ7Vjgn_IeYXX-8Jem7g",
    authDomain: "crwn-db-c3441.firebaseapp.com",
    databaseURL: "https://crwn-db-c3441.firebaseio.com",
    projectId: "crwn-db-c3441",
    storageBucket: "",
    messagingSenderId: "802589408180",
    appId: "1:802589408180:web:bddf41f4aa77d4718cd0e1",
    measurementId: "G-JKRHHRLJP6"
};

firebase.initializeApp(config);


// Google Auth
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Setup Google Authentication Utility
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

