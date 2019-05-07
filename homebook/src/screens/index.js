import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from "react-redux";
import configureStore from "../store/configureStore.js";
import 'babel-polyfill';
import Login from './Login';
import Recover from './Recover';
import CreateAccount from './CreateAccount';
import HomeScreen from './HomeScreen';
import AddUser from './AddUser';
import SetLocation from './SetLocation';
import UserProfile from './UserProfile';
import FriendProfile from './FriendProfile';
import EditUser from './EditUser';
import SideMenu from './SideMenu';
import SearchUser from './SearchUser';
import ChangePassScreen from './ChangePassScreen';
import ChangeEmailScreen from './ChangeEmailScreen';
import RequestPage from './RequestPage';
import EditFriend from './EditFriend';



function registerScreens() {
  const reduxStore = configureStore();
  Navigation.registerComponent('LoginScreen', () => (props) => (
    <Provider store={reduxStore}>
      <Login {...props} />
    </Provider>
  ), () => Login);

  Navigation.registerComponent('RecoveryScreen', () => (props) => (
    <Provider store={reduxStore}>
      <Recover {...props} />
    </Provider>
  ), () => Recover);

  Navigation.registerComponent('CreateAccountScreen', () => (props) => (
    <Provider store={reduxStore}>
      <CreateAccount {...props} />
    </Provider>
  ), () => CreateAccount);

  Navigation.registerComponent('HomeScreen', () => (props) => (
    <Provider store={reduxStore}>
      <HomeScreen {...props} />
    </Provider>
  ), () => HomeScreen);
  Navigation.registerComponent('AddUser', () => (props) => (
    <Provider store={reduxStore}>
      <AddUser {...props} />
    </Provider>
  ), () => AddUser);

  Navigation.registerComponent('SetLocation', () => (props) => (
    <Provider store={reduxStore}>
      <SetLocation {...props} />
    </Provider>
  ), () => SetLocation);
  Navigation.registerComponent('UserProfile', () => (props) => (
    <Provider store={reduxStore}>
      <UserProfile {...props} />
    </Provider>
  ), () => UserProfile);

  Navigation.registerComponent('FriendProfile', () => (props) => (
    <Provider store={reduxStore}>
      <FriendProfile {...props} />
    </Provider>
  ), () => FriendProfile);

  Navigation.registerComponent('EditUser', () => (props) => (
    <Provider store={reduxStore}>
      <EditUser {...props} />
    </Provider>
  ), () => EditUser);

  Navigation.registerComponent('SideMenu', () => (props) => (
    <Provider store={reduxStore}>
      <SideMenu {...props} />
    </Provider>
  ), () => SideMenu);

  Navigation.registerComponent('SearchUser', () => (props) => (
    <Provider store={reduxStore}>
      <SearchUser {...props} />
    </Provider>
  ), () => SearchUser);
  Navigation.registerComponent('ChangePassScreen', () => (props) => (
    <Provider store={reduxStore}>
      <ChangePassScreen {...props} />
    </Provider>
  ), () => ChangePassScreen);

  Navigation.registerComponent('ChangeEmailScreen', () => (props) => (
    <Provider store={reduxStore}>
      <ChangeEmailScreen {...props} />
    </Provider>
  ), () => ChangeEmailScreen);

  Navigation.registerComponent('RequestPage', () => (props) => (
    <Provider store={reduxStore}>
      <RequestPage {...props} />
    </Provider>
  ), () => RequestPage);

  Navigation.registerComponent('EditFriend', () => (props) => (
    <Provider store={reduxStore}>
      <EditFriend {...props} />
    </Provider>
  ), () => EditFriend);
}

export default {
  registerScreens
};