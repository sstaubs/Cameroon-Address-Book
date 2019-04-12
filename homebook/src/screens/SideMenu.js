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


    closeSideMenu = () => Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
            left: { visible: false }
        }
    });

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
                        <TouchableOpacity>
                            <Text style={styles.innerRedText}>Delete Account</Text>
                        </TouchableOpacity>
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
        marginTop: 55
    },
    innerText: {
        color: 'white',
        fontSize: 25
    },
    textPadding: {
        paddingTop: 30
    },
    innerRedText: {
        color: '#E24A4A',
        fontSize: 25
    }
});


export default SideMenu;