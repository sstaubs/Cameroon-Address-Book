import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';

class ChangeEmailScreen extends Component {
    state = {
        docId: '',
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

    componentDidMount() {
        var db = firebase.firestore();
        db.collection("users").where("uid", "==", firebase.auth().currentUser.uid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                this.setState({
                    email: doc.data().email,
                    docId: doc.id
                });

            });
        }).catch(function (error) {
            alert("Error getting documents: " + error);
        });
    }

    changeEmail = val => {

        var user = firebase.auth().currentUser;
        var db = firebase.firestore();

        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            this.state.currentPassword
        );

        const accountInfo = {
            email: this.state.newEmail
        };

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
        }).then(() => {
            db.collection("users").doc(this.state.docId).update(accountInfo)
                .then(() => {
                    console.log("Document successfully updated!");
                }).catch((error) => {
                    // The document probably doesn't exist.
                    alert("Error updating document: " + error);
                });
        }).catch(() => {
            // An error happened.
            alert("Was not authenticated");
        });


        this.backArrow();

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.alignment}>
                    <TouchableOpacity
                        style={styles.backIcon}
                        onPress={this.backArrow}
                    >
                        <Icon size={35} name='ios-arrow-round-back' color='white' />
                    </TouchableOpacity>
                    <Text style={styles.mainText}>Change Email</Text>
                    <Text style={styles.label}>Current Email</Text>
                    <TextInput
                        keyboardType='email-address'
                        style={styles.userInput}
                        placeholder="johndoe@example.com"
                        autoCapitalize='none'
                        placeholderTextColor="gray"
                        onChangeText={this.emailHandler}
                        returnKeyType={"next"}
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        blurOnSubmit={false}
                    />
                    <Text style={styles.label}>Current Password</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={styles.userInput}
                        placeholder="••••••••••"
                        placeholderTextColor="gray"
                        onChangeText={this.passHandler}
                        returnKeyType={"next"}
                        ref={(input) => { this.secondTextInput = input; }}
                        onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                        blurOnSubmit={false}
                    />
                    <Text style={styles.label}>New Email</Text>
                    <TextInput
                        keyboardType='email-address'
                        style={styles.userInput}
                        placeholder="johndoe@example.com"
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholderTextColor="gray"
                        onChangeText={this.newEmailHandler}
                        ref={(input) => { this.thirdTextInput = input; }}
                        returnKeyType={"done"}
                        blurOnSubmit={true}
                    />
                </View>
                <TouchableOpacity
                    style={styles.bottomButton}
                    onPress={this.changeEmail}
                >
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>UPDATE EMAIL</Text>
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

export default ChangeEmailScreen;