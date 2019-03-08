import React from 'react';
import { Navigation } from 'react-native-navigation';
import Login from './Login';
import Recover from './Recover';

function registerScreens(){
    Navigation.registerComponent('LoginScreen', () => Login);
    Navigation.registerComponent('RecoveryScreen', () => Recover);
}

export default {
    registerScreens
};