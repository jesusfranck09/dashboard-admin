import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDJrE5mcqZA53jpIcpj6U46V2xKMBCJE5Y",
    authDomain: "react-image-upload-6c21b.firebaseapp.com",
    databaseURL: "https://react-image-upload-6c21b.firebaseio.com",
    projectId: "react-image-upload-6c21b",
    storageBucket: "react-image-upload-6c21b.appspot.com",
    messagingSenderId: "593367122326",
    appId: "1:593367122326:web:7ea18679964861a39d9db7",
    measurementId: "G-0PJTX1H3VX"
  };
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  
  export { storage, firebase as default };