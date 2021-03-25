import firebase from "firebase";
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBblGne7S4-eMkaxSGTiAE7jA00ajA7o3w",
    authDomain: "incora-test.firebaseapp.com",
    projectId: "incora-test",
    storageBucket: "incora-test.appspot.com",
    messagingSenderId: "58349705597",
    appId: "1:58349705597:web:e20a1c8f7f011c0699d414"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export {firestore};
