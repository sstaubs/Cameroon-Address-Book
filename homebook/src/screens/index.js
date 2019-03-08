import React from 'react';
import { Navigation } from 'react-native-navigation';
import Login from './Login';

function registerScreens(){
    Navigation.registerComponent(`LoginScreen`, () => Login);
}

export default {
    registerScreens
};