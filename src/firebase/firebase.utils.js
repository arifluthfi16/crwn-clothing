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

// Function to fetch user data from google sign in and store to firebase user collection

// This will create a new user if it doesnt exsists in database
/* Steps
* #1 :
* We export the function so it reusable, we will use it in App.js, this is an async function
* The two parameters are userAuth -> For the user data that returned from google auth
* additionalData -> Literally any additional data that might be useful
*
* #2 :
* Checking if theres a user logged in or not, by checking is the object a null or not
*
* #3 :
* Getting the user data from database, with certain document path.
* */

// #1
export const createUserProfileDocument = async (userAuth, additionalData) => {
    //#2
    if(!userAuth){
        return
    }

    //#3
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    //If the data is not exists in database store a new the document reference
    if(!snapShot.exists){
        //Literally create new data in database
        const{displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch (e) {
            console.log("error createing user", e.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);


// Google Auth
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Setup Google Authentication Utility
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

