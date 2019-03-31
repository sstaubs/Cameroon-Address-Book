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

    popToLogin = () => Navigation.pop(this.props.componentId);

    render(){
        return(
            <View style={styles.container}>
                <Text>Home Screen</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#222222'
    }
});

export default HomeScreen;