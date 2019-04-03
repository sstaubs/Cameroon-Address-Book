import { Navigation } from "react-native-navigation";
const { registerScreens } = require('./screens').default;
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDq2nsaA2bJ4mxXDIj7l0W_JOttKfEx2IM",
  authDomain: "homebook-c9e3b.firebaseapp.com",
  databaseURL: "https://homebook-c9e3b.firebaseio.com",
  projectId: "homebook-c9e3b",
  storageBucket: "homebook-c9e3b.appspot.com",
  messagingSenderId: "912143095807"
};
firebase.initializeApp(config);

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
              name: "HomeScreen"
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