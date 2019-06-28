import firebase from 'firebase/app'
require("firebase/database")


var firebaseConfig = {
    apiKey: "AIzaSyCaF1VpKFLlh3kJFAulFsOfdw-huJ9lna8",
    authDomain: "parkhour2019.firebaseapp.com",
    databaseURL: "https://parkhour2019.firebaseio.com",
    projectId: "parkhour2019",
    storageBucket: "",
    messagingSenderId: "514313143680",
    appId: "1:514313143680:web:66a03897b2ac4556"
  };

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
export default database