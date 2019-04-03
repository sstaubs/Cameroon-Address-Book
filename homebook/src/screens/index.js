import React from 'react';
import { Navigation } from 'react-native-navigation';
import Login from './Login';
import Recover from './Recover';
import CreateAccount from './CreateAccount';
import HomeScreen from './HomeScreen';
import AddUser from './AddUser';

function registerScreens(){
    Navigation.registerComponent('LoginScreen', () => Login);
    Navigation.registerComponent('RecoveryScreen', () => Recover);
    Navigation.registerComponent('CreateAccountScreen', () => CreateAccount);
    Navigation.registerComponent('HomeScreen', () => HomeScreen);
    Navigation.registerComponent('AddUser', () => AddUser);
}

export default {
    registerScreens
};