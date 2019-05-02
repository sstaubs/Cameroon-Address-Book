import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { getReference } from "../store/actions/index";

class HomeScreen extends Component {
    state = {
        firstname: '',
        lastname: '',
        docId: '',
        friendNameArray: [],
        referenceArray: [],
    };

    ReferenceHandler = placeName => {
        this.props.onGetReference(placeName);
    };

    openSideMenu = () => Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
            left: { visible: true }
        }
    });

    componentDidMount() {
        //this.navigationEventListener = Navigation.events().bindComponent(this);
        var db = firebase.firestore();
        /* this.setState({
             referenceArray: [],
             friendNameArray: [],
 
         });
         */



       

        
        db.collection("users").where("uid", "==", firebase.auth().currentUser.uid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //alert(doc.data().email);
                //alert(doc.id, " => ", doc.data());
                //alert(doc)
                db.collection("users").doc(doc.id).collection("friends").orderBy("lastN").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {


                        this.setState({
                            referenceArray: this.state.referenceArray.concat([doc.id]),
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
        
        /*
        db.collection("users").doc("4DwmcpbF6Q2mgZxpzRHq").collection("friends").orderBy("lastN").onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    this.setState({
                        referenceArray: this.state.referenceArray.concat([change.doc.id]),
                        friendNameArray: this.state.friendNameArray.concat([change.doc.data().firstN + " " + change.doc.data().lastN]),
    
                    });
                }
                if (change.type === "modified") {
                    alert("Modified city: " + change.doc.data());
                }
                if (change.type === "removed") {
                    alert("Removed city: " + change.doc.data());
                }
            });
        });
        */
        
    }

    componentDidDisappear() {
        //no current function
    }

    componentDidAppear() {
        /* this.setState({
             referenceArray: [],
             friendNameArray: [],
 
         });
         */



       

        /*

        
        db.collection("users").where("uid", "==", firebase.auth().currentUser.uid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //alert(doc.data().email);
                //alert(doc.id, " => ", doc.data());
                //alert(doc)
                db.collection("users").doc(doc.id).collection("friends").orderBy("lastN").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {


                        this.setState({
                            referenceArray: this.state.referenceArray.concat([doc.id]),
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
        */
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

    pushAddUser = () => Navigation.push(this.props.componentId, {
        component: {
            name: 'AddUser'
        }
    });

    friendHandler = val => {
        //alert(this.state.referenceArray[val])
        this.ReferenceHandler(this.state.referenceArray[val])
        //alert(this.props.refpoint);
        this.pushFriendProfile();
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.icons}>
                    <TouchableOpacity
                        style={styles.signoutIcon}
                        onPress={this.openSideMenu}>
                        <Icon size={25} name='ios-menu' color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.addIcon}
                        onPress={this.pushAddUser}>
                        <Icon size={35} name='ios-add' color='white' />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.alignment}>
                    <TouchableOpacity
                        onPress={this.pushUserProfile}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Icon size={35} name='ios-contact' color='white' />
                            <Text style={styles.mainText}>   {this.state.firstname} {this.state.lastname}</Text>
                        </View>
                    </TouchableOpacity>

                    <FlatList
                        style={styles.list}
                        data={this.state.friendNameArray}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity
                                onPress={() => this.friendHandler(index)}
                            >
                                <Text style={styles.bodyText}>{item}</Text>
                            </TouchableOpacity>
                        }
                        keyExtractor={(index) => index.toString()}
                    />
                </ScrollView>
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
    alignment: {
        width: '85%'
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '85%',
        marginTop: 40
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 25,
        color: 'white'
    },
    list: {
        marginTop: 20
    },
    bodyText: {
        color: 'white',
        marginTop: 10,
        fontSize: 18
    }
});
const mapStateToProps = state => {
    return {
        firstName: state.user.firstName,

    };
};


const mapDispatchToProps = dispatch => {
    return {
        onGetReference: name => dispatch(getReference(name)),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);