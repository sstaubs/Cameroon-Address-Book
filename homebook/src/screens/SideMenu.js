import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';
import Modal from "react-native-modal";




class SideMenu extends Component {
    state = {
        currentPassword: '',
        docId: '',
        isModalVisible: false
    };

    signout = () => {
        firebase.auth().signOut();
        Navigation.popToRoot(this.props.componentId);
    };

    changePassword = () => Navigation.push(this.props.componentId, {
        component: {
            name: 'ChangePassScreen'
        }
    });

    changeEmail = () => Navigation.push(this.props.componentId, {
        component: {
            name: 'ChangeEmailScreen'
        }
    });

    deleteAccount = () => {
        var user = firebase.auth().currentUser;
        var db = firebase.firestore();

        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            this.state.currentPassword
        );

        user.reauthenticateAndRetrieveDataWithCredential(credential).then(() => {
            // User re-authenticated.
            db.collection("users").where("uid", "==", firebase.auth().currentUser.uid).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    db.collection("users").doc(doc.id).delete();
                })
            }).then(() => {
                user.delete().then(() => {
                    // User deleted.
                    Navigation.popToRoot(this.props.componentId);
                }).catch(() => {
                    // An error happened.
                });
            }).catch(function (error) {
                alert("Error getting documents: " + error);
            });
        }).catch(() => {
            // An error happened.
            alert("Password Incorrect");
        });









    };

    closeSideMenu = () => Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
            left: { visible: false }
        }
    });

    passHandler = val => {
        this.setState({
            currentPassword: val,
        });
    };

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.alignment}>
                    <View style={styles.icons}>
                        <TouchableOpacity
                            style={styles.closeIcon}
                            onPress={this.closeSideMenu}>
                            <Icon size={35} name='ios-close' color='white' />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textPadding}>
                        <TouchableOpacity
                            onPress={this.changePassword}>
                            <Text style={styles.innerText}>Reset Password</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textPadding}>
                        <TouchableOpacity
                            onPress={this.changeEmail}>
                            <Text style={styles.innerText}>Change Email</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textPadding}>
                        <TouchableOpacity
                            onPress={this.signout}>
                            <Text style={styles.innerText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textPadding}>
                        <TouchableOpacity
                            onPress={this._toggleModal}>
                            <Text style={styles.innerRedText}>Delete Account</Text>
                        </TouchableOpacity>
                        <Modal isVisible={this.state.isModalVisible}>
                            <Text style={styles.label}>Current Password</Text>
                            <TextInput
                                keyboardType="number-pad"
                                style={styles.userInput}
                                placeholder="Current Password"
                                placeholderTextColor="gray"
                                onChangeText={this.passHandler}
                            />
                            <TouchableOpacity
                                onPress={this.deleteAccount}>
                                <Text style={styles.innerText}>Confirm Delete Account</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this._toggleModal}>
                                <Text style={styles.innerText}>Cancel</Text>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282828',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    alignment: {
        left: '3.5%'
    },
    closeIcon: {
        marginTop: 35
    },
    innerText: {
        color: 'white',
        fontSize: 25
    },
    textPadding: {
        paddingTop: 30
    },
    userInput: {
        borderColor: '#ffffe0',
        borderBottomWidth: 1,
        height: 40,
        fontSize: 17,
        color: 'white'
    },
    innerRedText: {
        color: '#E24A4A',
        fontSize: 25
    }
});


export default SideMenu;