import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';




class HomeScreen extends Component {
    state = {
        firstname: '',
        lastname: ''
    };

    componentDidMount() {
        var db = firebase.firestore();
       
        db.collection("users").where("uid", "==", firebase.auth().currentUser.uid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //alert(doc.data().email);
                //alert(doc.id, " => ", doc.data());

                this.setState({
                    
                    firstname: doc.data().firstN,
                    lastname: doc.data().lastN,
                });
                
                
            });
        
            
        }).catch(function (error) {
            alert("Error getting documents: " + error);
        });
        
       

    }



    pushAddUser = () => Navigation.push(this.props.componentId, {
        component: {
            name: 'AddUser'
        }
    });

    popToLogin = () => Navigation.pop(this.props.componentId);

    render() {
        

        return (

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <View style={styles.icons}>
                        <TouchableOpacity style={styles.shareIcon}>
                            <Icon size={25} name='ios-share-alt' color='white' />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.addIcon}
                            onPress={this.pushAddUser}>
                            <Icon size={35} name='ios-add' color='white' />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.mainText}>{this.state.firstname} {this.state.lastname}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.bodyText}>Person 1</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1,
                            width: '75%'
                        }}
                    />
                    <TouchableOpacity>
                        <Text style={styles.bodyText}>Person 2</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1,
                            width: '75%'
                        }}
                    />
                    <TouchableOpacity>
                        <Text style={styles.bodyText}>Person 3</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 55
    },
    shareIcon: {
        position: 'relative',
        right: 120
    },
    addIcon: {
        position: 'relative',
        left: 120
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 25,
        color: 'white'
    },
    bodyText: {
        fontSize: 20,
        color: 'white',
        marginTop: 14.5,
        marginBottom: 13.5,
        right: 100
    }
});

export default HomeScreen;