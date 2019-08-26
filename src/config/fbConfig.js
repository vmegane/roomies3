import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = { 
    apiKey: "AIzaSyBx6Mr2h3Dyh-EEDsd8O-g3wqaDsXYNEqA",
    authDomain: "roomies-80535.firebaseapp.com",
    databaseURL: "https://roomies-80535.firebaseio.com",
    projectId: "roomies-80535",
    storageBucket: "roomies-80535.appspot.com",
    messagingSenderId: "766894690619"
  }

  firebase.initializeApp(config)
  firebase.firestore();

  export default firebase;