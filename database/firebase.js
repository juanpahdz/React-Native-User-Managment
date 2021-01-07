import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAO75vWFyvoAGjNCF2znaGAilFMb9ngJqY",
    authDomain: "usermanagment-react-native.firebaseapp.com",
    projectId: "usermanagment-react-native",
    storageBucket: "usermanagment-react-native.appspot.com",
    messagingSenderId: "287112638208",
    appId: "1:287112638208:web:3e2535a3aa36741cf64de5"
  };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore()
export default {
    firebase,
    db
}