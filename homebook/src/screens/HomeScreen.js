import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';




class HomeScreen extends Component {
    state = {
        phone: '',
        password: ''
    };

    phoneHandler = val => {
        this.setState({
            phone: val,
        });
    };



    popToLogin = () => Navigation.pop(this.props.componentId);

    render() {
        var db = firebase.firestore();
        db.collection("users").where("uid", "==", firebase.auth().currentUser.uid).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                alert(doc.data().email);
                //alert(doc.id, " => ", doc.data());
            });
        })
            .catch(function (error) {
                alert("Error getting documents: " + error);
            });

        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <Icon size={25} name='ios-share-alt' color='white' />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon size={35} name='ios-add' color='white' />
                </TouchableOpacity>
                <Text style={styles.mainText}>Home Screen</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#222222'
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 50,
        color: 'white'
    }
});

export default HomeScreen;