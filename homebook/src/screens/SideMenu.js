import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
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

    pushRequestPage = () => Navigation.push(this.props.componentId, {
        component: {
          name: 'RequestPage'
        }
      });

    signout = () => {
        firebase.auth().signOut();
        Navigation.push(this.props.componentId, {
            component: {
                name: 'LoginScreen'
            }
        });
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

    confirmInput = () => {
        if (this.state.currentPassword == '') {
            alert("Please input the current password");
            return false;
        }
        return true;
    };

    deleteAccount = () => {
        var user = firebase.auth().currentUser;
        var db = firebase.firestore();

        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            this.state.currentPassword
        );

        if (this.confirmInput()) {
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
        }
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
                            <Icon size={38} name='ios-close' color='white' />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textPadding}>
                        <TouchableOpacity
                            onPress={this.pushRequestPage}>
                            <Text style={styles.innerText}><Icon size={20} name='ios-download' color='white' />  Contact Requests</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textPadding}>
                        <TouchableOpacity
                            onPress={this.changePassword}>
                            <Text style={styles.innerText}><Icon size={20} name='ios-key' color='white' />  Reset Password</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textPadding}>
                        <TouchableOpacity
                            onPress={this.changeEmail}>
                            <Text style={styles.innerText}><Icon size={20} name='ios-mail' color='white' />  Change Email</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textPadding}>
                        <TouchableOpacity
                            onPress={this.signout}>
                            <Text style={styles.innerText}><Icon size={20} name='ios-log-out' color='white' />  Logout</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textPadding}>
                        <TouchableOpacity
                            onPress={this._toggleModal}>
                            <Text style={styles.innerRedText}><Icon size={20} name='ios-trash' color='#E24A4A' />  Delete Account</Text>
                        </TouchableOpacity>
                        <Modal isVisible={this.state.isModalVisible}>
                            <Text style={styles.mainText}>Enter Password To Delete Account</Text>
                            <Text style={styles.label}>Current Password</Text>
                            <TextInput
                                style={styles.userInput}
                                secureTextEntry={true}
                                placeholder='••••••••••'
                                placeholderTextColor="gray"
                                onChangeText={this.passHandler}
                                returnKeyType={"done"}
                            />
                            <View style={styles.modalText}>
                                <TouchableOpacity
                                    onPress={this._toggleModal}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this.deleteAccount}>
                                    <Text style={styles.deleteText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
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
        left: '4%'
    },
    closeIcon: {
        marginTop: 35
    },
    innerText: {
        color: 'white',
        fontSize: 20
    },
    textPadding: {
        paddingTop: 30
    },
    innerRedText: {
        color: '#E24A4A',
        fontSize: 20
    },
    mainText: {
        color: 'white',
        fontSize: 30
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
        color: 'white',
        marginBottom: 10
    },
    modalText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center',
        width: '70%',
        marginTop: 30
    },
    cancelText: {
        color: 'white',
        fontSize: 20
    },
    deleteText: {
        color: '#E24A4A',
        fontSize: 20
    }
});


export default SideMenu;