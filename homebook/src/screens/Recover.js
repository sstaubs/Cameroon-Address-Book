import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';

class Recover extends Component {
    state = {
        email: '',
        newPassword: ''
    };

    backArrow = () => Navigation.pop(this.props.componentId, {
        component: {
            name: 'LoginScreen'
        }
    });

    pushLoginScreen() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'LoginScreen'
            }
        });
    };

    emailHandler = val => {
        this.setState({
            email: val,
        });
    };

    //problem with this.state.email
    sendEmailRecover = val => {
        var auth = firebase.auth();
        var emailAddress = this.state.email;
        auth.sendPasswordResetEmail(emailAddress).then(() => {
            // Email sent.
            //alert("Recovery email has been sent to:" + this.state.email);
            this.pushLoginScreen();
        }).catch(function (error) {
            alert(error);
        });
    };


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
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        keyboardType="number-pad"
                        style={styles.userInput}
                        placeholder="Email"
                        placeholderTextColor="gray"
                        onChangeText={this.emailHandler}
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={this.sendEmailRecover}
                    >
                        <Text style={{ color: '#3F7F40', fontSize: 16, fontWeight: '700' }}>SEND</Text>
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
        marginTop: 55
    },
    mainText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 24
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

export default Recover;