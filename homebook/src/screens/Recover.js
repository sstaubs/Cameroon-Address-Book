import React, {Component} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import { Navigation } from 'react-native-navigation';

class Recover extends Component {
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
            <View style={styles.container}>
                <Text style={styles.mainText}>Reset Password</Text>
                <Text style={styles.subText}>Phone Number</Text>
                <TextInput
                    keyboardType="number-pad"
                    style={styles.phoneInfo}
                    placeholder="Phone Number"
                    placeholderTextColor="gray"
                    onChangeText={this.phoneHandler}
                  />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={this.popToLogin}
                >
                <Text style={{ color: 'white', fontWeight: '500' }}>SEND</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 94,
      backgroundColor: '#222222',
    },
    mainText: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
      width: 300,
      textAlign: 'center'
    },
    subText: {
        color: 'white',
        fontSize: 17,
        marginTop: 50,
        width: 300
    },
    phoneInfo: {
        width: 300,
        marginTop: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: 'white',
        fontSize: 17,
        height: 32,
        color: 'white'
    },
    sendButton: {
        width: 300,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4A90E2',
        height: 32
    }
});

export default Recover;