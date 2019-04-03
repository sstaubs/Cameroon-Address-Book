import { Navigation } from "react-native-navigation";
const { registerScreens } = require('./screens').default;
import * as firebase from 'firebase';
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyDq2nsaA2bJ4mxXDIj7l0W_JOttKfEx2IM",
  authDomain: "homebook-c9e3b.firebaseapp.com",
  databaseURL: "https://homebook-c9e3b.firebaseio.com",
  projectId: "homebook-c9e3b",
  storageBucket: "homebook-c9e3b.appspot.com",
  messagingSenderId: "912143095807"
};
firebase.initializeApp(config);

var db = firebase.firestore();

db.collection("users").add({
  first: "Ada",
  last: "Lovelace",
  born: 1815
})
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});

firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});

function start(){
  registerScreens();
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        stack:{
          children:[{
            component:{
              name: "LoginScreen"
            }

          }]
        }
      }
    });
  });
}

module.exports = {
  start
};