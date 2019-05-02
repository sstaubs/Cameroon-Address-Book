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
                        secureTextEntry={true}
                        style={styles.userInput}
                        placeholder="••••••••••"
                        placeholderTextColor="gray"
                        onChangeText={this.passHandler}
                        returnKeyType = { "next" }
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        blurOnSubmit={false}
                    />
                    <Text style={styles.label}>Confirm New Password</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={styles.userInput}
                        placeholder="••••••••••"
                        placeholderTextColor="gray"
                        onChangeText={this.confirmPassHandler}
                        ref={(input) => { this.secondTextInput = input; }}
                        returnKeyType = { "done" }
                        blurOnSubmit={true}
                    />
                </View>
                <TouchableOpacity
                    style={styles.bottomButton}
                    onPress={this.changePassword}
                >
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>UPDATE PASSWORD</Text>
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
        textAlign: 'center',
        marginTop: 24,
        marginBottom: 30
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
    bottomButton: {
        width: '100%',
        position: 'absolute',
        height: 55,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3F7F40'
    }
});

export default ChangePassScreen;