import firebase from "firebase";
import 'firebase/auth';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDUptZhP_YT1sqamDr7iJQS0SF6E4uvwYw",
    authDomain: "unichat-2d26d.firebaseapp.com",
    projectId: "unichat-2d26d",
    storageBucket: "unichat-2d26d.appspot.com",
    messagingSenderId: "529154617595",
    appId: "1:529154617595:web:6fc835b27b2c867143c05e"
  }).auth();