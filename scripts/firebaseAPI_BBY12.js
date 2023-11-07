//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyA_vnATk5-BXC-Wj9C8Q9cZsN7nWHx7Vd0",
    authDomain: "comp1800bby12-20ef4.firebaseapp.com",
    projectId: "comp1800bby12-20ef4",
    storageBucket: "comp1800bby12-20ef4.appspot.com",
    messagingSenderId: "731770957175",
    appId: "1:731770957175:web:826114a76a6970f4a84572"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
