import { getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC8st1L4AccM24HHK8Gv8gu61ErjsxDXWE",
    authDomain: "football-app-d5d9d.firebaseapp.com",
    projectId: "football-app-d5d9d",
    storageBucket: "football-app-d5d9d.appspot.com",
    messagingSenderId: "1055122427615",
    appId: "1:1055122427615:web:77a4213c6f4057014fe36a",
    measurementId: "G-R08HLPZCXM"
  };
  
  // Initialize Firebase
  let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

  export default firebase_app;