import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAk8Ka2Jxj6uScQr3TBk3iWTaqsowrA9eA",
  authDomain: "wemet-21b6d.firebaseapp.com",
  projectId: "wemet-21b6d",
  storageBucket: "wemet-21b6d.appspot.com",
  messagingSenderId: "269020258877",
  appId: "1:269020258877:web:4f8014574f01e002488054",
  measurementId: "G-F8DRD7N3CP"
};


  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  export default storage;
  // "firebase": "^8.9.1",