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
                <View style={styles.alignment}>
                    <TouchableOpacity
                        style={styles.backIcon}
                        onPress={this.backArrow}
                    >
                        <Icon size={25} name='ios-arrow-back' color='white' />
                    </TouchableOpacity>
                    <Text style={styles.mainText}>Change Email</Text>
                    <Text style={styles.label}>Current Email</Text>
                    <TextInput
                        keyboardType="number-pad"
                        style={styles.userInput}
                        placeholder="Current Email"
                        placeholderTextColor="gray"
                        onChangeText={this.emailHandler}
                    />
                    <Text style={styles.label}>Current Password</Text>
                    <TextInput
                        keyboardType="number-pad"
                        style={styles.userInput}
                        placeholder="Current Password"
                        placeholderTextColor="gray"
                        onChangeText={this.passHandler}
                    />
                    <Text style={styles.label}>New Email</Text>
                    <TextInput
                        keyboardType="number-pad"
                        style={styles.userInput}
                        placeholder="New Email"
                        placeholderTextColor="gray"
                        onChangeText={this.newEmailHandler}
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={this.changeEmail}
                    >
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>UPDATE EMAIL</Text>
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
        marginTop: 40
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
    label: {
        color: '#7ABAF2',
        paddingTop: 30,
        fontSize: 13
    },
    userInput: {
        borderColor: '#7ABAF2',
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
        backgroundColor: '#3F7F40',
        borderRadius: 20,
        height: 40
    }
});

export default ChangeEmailScreen;