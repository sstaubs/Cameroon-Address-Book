import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';


class HomeScreen extends Component {
    state = {
        firstname: '',
        lastname: '',
        docId: '',
        friendNameArray: [],
        referenceArray: [],
    };

    componentDidMount() {
        var db = firebase.firestore();

        db.collection("users").where("uid", "==", firebase.auth().currentUser.uid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //alert(doc.data().email);
                //alert(doc.id, " => ", doc.data());
                //alert(doc)

                db.collection("users").doc(doc.id).collection("friends").orderBy("lastN").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        this.setState({
                            referenceArray: this.state.referenceArray.concat([doc.data().refpoint]),
                            friendNameArray: this.state.friendNameArray.concat([doc.data().firstN + " " + doc.data().lastN]),

                        });
                    });
                }).catch(function (error) {
                    alert("Error getting documents: " + error);
                });

                this.setState({

                    firstname: doc.data().firstN,
                    lastname: doc.data().lastN,
                    docId: doc.id,
                });
            });

        }).catch(function (error) {
            alert("Error getting documents: " + error);
        });
    }

    pushLoginScreen() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'LoginScreen'
            }
        });
    }
    pushUserProfile = () => Navigation.push(this.props.componentId, {
        component: {
            name: 'UserProfile'
        }
    });

    pushFriendProfile = () => Navigation.push(this.props.componentId, {
        component: {
            name: 'FriendProfile'
        }
    });

    pushSignout = () => {
        firebase.auth().signOut();
        this.pushLoginScreen();
    }

    pushAddUser = () => Navigation.push(this.props.componentId, {
        component: {
            name: 'AddUser'
        }
    });

    friendHandler = val => {
        alert(this.state.referenceArray[val])

    };



    render() {
        return (
            <View style={styles.container}>
                <View style={styles.icons}>
                    <TouchableOpacity
                        style={styles.signoutIcon}
                        onPress={this.pushSignout}>
                        <Icon size={25} name='ios-log-out' color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.addIcon}
                        onPress={this.pushAddUser}>
                        <Icon size={35} name='ios-add' color='white' />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={this.pushUserProfile}>
                    <Text style={styles.mainText}>{this.state.firstname} {this.state.lastname}</Text>
                </TouchableOpacity>


                <FlatList
                    style={styles.list}
                    data={
                        this.state.friendNameArray

                    }
                    renderItem={({ item, index }) =>
                        <TouchableOpacity
                            //onPress={() => this.friendHandler(index)}>
                            onPress={this.pushFriendProfile}>

                            <Text style={styles.bodyText}>{item}</Text>

                        </TouchableOpacity>
                    }

                />



            </View>

        );
    }
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1
    },
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
    signoutIcon: {
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
    list: {
        marginTop: 20,
        right: 80
    },
    bodyText: {
        color: 'white',
        marginTop: 10,
        fontSize: 18
    }
});

export default HomeScreen;