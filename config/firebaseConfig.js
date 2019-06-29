import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyCaF1VpKFLlh3kJFAulFsOfdw-huJ9lna8",
  authDomain: "parkhour2019.firebaseapp.com",
  databaseURL: "https://parkhour2019.firebaseio.com",
  projectId: "parkhour2019",
  storageBucket: "",
  messagingSenderId: "514313143680",
  appId: "1:514313143680:web:66a03897b2ac4556"
};
  
const firebaseExport =  firebase.initializeApp(firebaseConfig);
export default firebaseExport

  