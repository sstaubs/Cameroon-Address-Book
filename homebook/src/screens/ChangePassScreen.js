import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';

class ChangePassScreen extends Component {
    state = {
        email: '',
        currentPassword: '',
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

    currentPassHandler = val => {
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

    changePassword = val => {
        if (this.passwordConfirm()) {
            var user = firebase.auth().currentUser;

            const credential = firebase.auth.EmailAuthProvider.credential(
                user.email,
                this.state.currentPassword
            );


            user.reauthenticateAndRetrieveDataWithCredential(credential).then(() => {
                // User re-authenticated.
                user.updatePassword(this.state.newPassword).then(() => {
                    alert("Password was changed")
                }).catch((error) => {
                    alert(error.message);
                })
            }).catch( (error) => {
                // An error happened.
                alert("Was not authenticated");
            });

            this.backArrow();

        }
    }


    popToLogin = () => Navigation.pop(this.props.componentId);

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.alignment}>
                    <TouchableOpacity
                        style={styles.backIcon}
                        onPress={this.backArrow}
                    >
                        <Icon size={25} name='ios-arrow-back' color='white' />
                    </TouchableOpacity>
                    <Text style={styles.mainText}>Change Password</Text>
                    <Text style={styles.label}>New Password</Text>
                    <TextInput
                        keyboardType="number-pad"
                        style={styles.userInput}
                        placeholder="New Password"
                        placeholderTextColor="gray"
                        onChangeText={this.passHandler}
                    />
                    <Text style={styles.label}>Confirm New Password</Text>
                    <TextInput
                        keyboardType="number-pad"
                        style={styles.userInput}
                        placeholder="Confirm New Password"
                        placeholderTextColor="gray"
                        onChangeText={this.confirmPassHandler}
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={this.changePassword}
                    >
                        <Text style={{ color: '#3F7F40', fontSize: 16, fontWeight: '700' }}>UPDATE PASSWORD</Text>
                    </TouchableOpacity>
                </View>
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
    alignment: {
        width: '85%'
    },
    backIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 35
    },
    mainText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 24,
        marginBottom: 30
    },
    label: {
        color: '#ffffe0',
        paddingTop: 30,
        fontSize: 13
    },
    userInput: {
        borderColor: '#ffffe0',
        borderBottomWidth: 1,
        height: 40,
        fontSize: 17,
        color: 'white'
    },
    sendButton: {
        width: '100%',
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        height: 40
    }
});

export default ChangePassScreen;