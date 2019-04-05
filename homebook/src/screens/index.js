import React from 'react';
import { Navigation } from 'react-native-navigation';
import Login from './Login';
import Recover from './Recover';
import CreateAccount from './CreateAccount';
import HomeScreen from './HomeScreen';
import AddUser from './AddUser';
import SetLocation from './SetLocation';
import UserProfile from './UserProfile';
import EditUser from './EditUser';

function registerScreens(){
    Navigation.registerComponent('LoginScreen', () => Login);
    Navigation.registerComponent('RecoveryScreen', () => Recover);
    Navigation.registerComponent('CreateAccountScreen', () => CreateAccount);
    Navigation.registerComponent('HomeScreen', () => HomeScreen);
    Navigation.registerComponent('AddUser', () => AddUser);
    Navigation.registerComponent('SetLocation', () => SetLocation);
    Navigation.registerComponent('UserProfile', () => UserProfile);
    Navigation.registerComponent('EditUser', () => EditUser);
}

export default {
    registerScreens
};