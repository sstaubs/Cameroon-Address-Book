import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';



class RequestPage extends Component {
    state = {
        firstname: '',
        lastname: '',
        latitude: '',
        longitude: '',
        phoneNum: '',
        docId: '',
        friendNameArray: [],
        referenceArray: [],
        docArray: [],
    };

    backArrow = () => Navigation.pop(this.props.componentId, {
        component: {
          name: 'UserProfile'
        }
      });

    componentDidMount() {

        var db = firebase.firestore();
        db.collection("users").where("uid", "==", firebase.auth().currentUser.uid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //alert(doc.data().email);
                //alert(doc.id, " => ", doc.data());
                //alert(doc)
                db.collection("users").doc(doc.id).collection("requests").orderBy("lastN").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {


                        this.setState({
                            referenceArray: this.state.referenceArray.concat([doc.data().refpoint]),
                            docArray: this.state.docArray.concat([doc.id]),
                            friendNameArray: this.state.friendNameArray.concat([doc.data().firstN + " " + doc.data().lastN]),

                        });
                    });
                }).catch(function (error) {
                    alert("Error getting documents: " + error);
                });
                this.setState({
                    firstname: doc.data().firstN,
                    lastname: doc.data().lastN,
                    email: doc.data().email,
                    phoneNum: doc.data().phoneNum,
                    latitude: doc.data().latitude,
                    longitude: doc.data().longitude,
                    docId: doc.id,
                });
            });
        }).catch(function (error) {
            alert("Error getting documents: " + error);
        });
    }

    removeRequest = val => {

        var db = firebase.firestore();

        db.collection("users").doc(this.state.docId).collection("requests").doc(this.state.docArray[val]).delete().then(() => {
            //console.log("Document successfully deleted!");
        }).catch((error) => {
            //console.error("Error removing document: ", error);
        });


    }

    acceptHandler = val => {

        const UserInfo = {
            firstN: this.state.firstname,
            lastN: this.state.lastname,
            phoneNum: this.state.phoneNum,
            email: this.state.email,
            latitude: this.state.latitude,
            longitude: this.state.longitude,

        };
        var db = firebase.firestore();
        db.collection("users").doc(this.state.referenceArray[val]).collection("friends").add(UserInfo)
            .then((docRef) => {
                //alert("Document written with ID: " + docRef.id);
                this.removeRequest(val);
            }).catch((error) => {
                //alert("error here")
                //alert("Error adding document: " + error);
            });



    }

    declineHandler = val => {
        this.removeRequest(val);

    }




    render() {
        return (
            <View style={styles.container}>
                <View style={styles.alignment}>
                    <View style={styles.icons}>
                        <TouchableOpacity
                            style={styles.icons}
                            onPress={this.backArrow}
                        >
                            <Icon size={25} name='ios-arrow-back' color='white' />
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.mainText}>Requests</Text>



                    <FlatList
                        style={styles.list}
                        data={this.state.friendNameArray}
                        renderItem={({ item, index }) =>
                            <View>
                                <Text style={styles.bodyText}>{item}</Text>
                                <TouchableOpacity
                                    style={styles.acceptButton}
                                    onPress={() => this.acceptHandler(index)}
                                >
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.declineButton}
                                    onPress={() => this.declineHandler(index)}
                                >
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>Decline</Text>
                                </TouchableOpacity>
                            </View>

                        }
                        keyExtractor={(index) => index.toString()}
                    />
                </View>
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
    alignment: {
        width: '85%'
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40
    },
    mainText: {
        alignItems: 'center',
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
    },
    acceptButton: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3F7F40',
        borderRadius: 20,
        height: 40
    },
    declineButton: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E24A4A',
        borderRadius: 20,
        height: 40
    }
});


export default RequestPage;