import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';


class SideMenu extends Component {
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

    /*changePassword = () => {
        var user = firebase.auth().currentUser;
        user.updatePassword("123456").then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        }); 
    }*/

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.icons}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={this.pushCloseButton}>
                        <Icon size={35} name='ios-close' color='white' />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <TouchableOpacity
                        onPress={this.changePassword}>
                        <Text style={styles.innerText}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.changeEmail}>
                        <Text style={styles.innerText}>Change Email</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.signout}>
                        <Text style={styles.innerText}>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.innerText}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282828',
        flexDirection: 'column'
    },
    closeIcon: {
        marginTop: 55
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerText: {
        color: 'white',
        fontSize: 18,
        margin: 30
    }
});


export default SideMenu;