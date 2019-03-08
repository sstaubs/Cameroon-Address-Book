import { Navigation } from "react-native-navigation";
const { registerScreens } = require('./screens').default;

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