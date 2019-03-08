import React, {Component} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import { Navigation } from 'react-native-navigation';

class HomeScreen extends Component {
    state = {
        phone: '',
        password: ''
      };

    phoneHandler = val => {
        this.setState({
            phone: val,
        });
    };

    popToLogin  = () => Navigation.pop(this.props.componentId);

    render(){
        return(
            <View >
                <Text>Home Screen</Text>
            </View>
        );
    }
};
export default HomeScreen;