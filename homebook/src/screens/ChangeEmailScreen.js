import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';

class ChangeEmailScreen extends Component {
    state = {
        currentPassword: '',
        email: '',
        newEmail: ''
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

    newEmailHandler = val => {
        this.setState({
            newEmail: val,
        });
    };

    passHandler = val => {
        this.setState({
            currentPassword: val,
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

    changeEmail = val => {

        var user = firebase.auth().currentUser;

        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            this.state.currentPassword
        );


        user.reauthenticateAndRetrieveDataWithCredential(credential).then(() => {
            // User re-authenticated.
            user.updateEmail(this.state.newEmail).then(() => {
                //authentication email changed
                user.sendEmailVerification().then(() => {
                    // Email sent.
                    alert("Verification email sent to:" + this.state.newEmail);
                }).catch(() => {
                    // An error happened.
                    alert("Problem with verification email");
                });
            }).catch((error) => {
                alert(error.message);
            })
        }).catch(() => {
            // An error happened.
            alert("Was not authenticated");
        });


        this.backArrow();

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
                <Text style={styles.mainText}>Change Email</Text>
                <Text style={styles.subText}>Current Email</Text>
                <TextInput
                    keyboardType="number-pad"
                    style={styles.phoneInfo}
                    placeholder="Current Email"
                    placeholderTextColor="gray"
                    onChangeText={this.emailHandler}
                />
                <Text style={styles.subText}>Current Password</Text>
                <TextInput
                    keyboardType="number-pad"
                    style={styles.phoneInfo}
                    placeholder="Current Password"
                    placeholderTextColor="gray"
                    onChangeText={this.passHandler}
                />
                <Text style={styles.subText}>New Email</Text>
                <TextInput
                    keyboardType="number-pad"
                    style={styles.phoneInfo}
                    placeholder="New Email"
                    placeholderTextColor="gray"
                    onChangeText={this.newEmailHandler}
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={this.changeEmail}
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

export default ChangeEmailScreen;