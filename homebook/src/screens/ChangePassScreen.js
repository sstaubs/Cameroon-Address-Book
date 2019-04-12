import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';

class Recover extends Component {
    state = {
        email: '',
        newPassword: '',
        confirmPassword: ''
    };

    backArrow = () => Navigation.pop(this.props.componentId, {
        component: {
            name: 'LoginScreen'
        }
    });

    emailHandler = val => {
        this.setState({
            email: val,
        });
    };

    passHandler = val => {
        this.setState({
            newPassword: val,
        });
    };

    confirmPassHandler = val => {
        this.setState({
            confirmPassword: val,
        });
    };

    passwordConfirm = () => {
        if (this.state.password != this.state.confirmpassword) {
            alert("Password does not match");
            return false;
        }
        return true;
    };

    //Below will be used in the settings page when created to change an existing password

    changePassword = val => {
        if (this.passwordConfirm()) {
            var user = firebase.auth().currentUser;
            user.updatePassword(this.state.newPassword).then(() => {
                alert("Password was changed")
            }).catch((error) => {
                alert(error.message);
            })
            this.backArrow();
        }
    }


    popToLogin = () => Navigation.pop(this.props.componentId);

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.backIcon}
                    onPress={this.backArrow}
                >
                    <Icon size={25} name='ios-arrow-back' color='white' />
                </TouchableOpacity>
                <Text style={styles.mainText}>Change Password</Text>
                <Text style={styles.subText}>New Password</Text>
                <TextInput
                    keyboardType="number-pad"
                    style={styles.phoneInfo}
                    placeholder="New Password"
                    placeholderTextColor="gray"
                    onChangeText={this.passHandler}
                />
                <Text style={styles.subText}>Confirm New Password</Text>
                <TextInput
                    keyboardType="number-pad"
                    style={styles.phoneInfo}
                    placeholder="Confirm New Password"
                    placeholderTextColor="gray"
                    onChangeText={this.confirmPassHandler}
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={this.changePassword}
                >
                    <Text style={{ color: 'white', fontWeight: '500' }}>UPDATE</Text>
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
        backgroundColor: '#222222',
    },
    backIcon: {
        position: 'relative',
        right: 140,
        marginTop: 70
    },
    mainText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        width: 300,
        textAlign: 'center',
        marginTop: 24
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