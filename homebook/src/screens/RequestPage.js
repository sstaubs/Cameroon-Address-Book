import React, { Component } from 'react';
import { ImageBackground, Alert, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

class RequestPage extends Component {
    state = {

        friendNameArray: [],
        referenceArray: [],
        docArray: [],
        refresh: false
    };

    backArrow = () => Navigation.pop(this.props.componentId, {
        component: {
            name: 'UserProfile'
        }
    });

    componentDidMount() {
        var db = firebase.firestore();

        db.collection("users").doc(this.props.user.docId).collection("requests").orderBy("lastN").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {


                this.setState({
                    docArray: this.state.docArray.concat([doc.id]),
                    friendNameArray: this.state.friendNameArray.concat([doc.data().firstN + " " + doc.data().lastN]),

                });
            });
        }).catch(function (error) {
            alert("Error getting documents: " + error);
        });

    }

    removeRequest = val => {
        var db = firebase.firestore();

        db.collection("users").doc(this.props.user.docId).collection("requests").doc(this.state.docArray[val]).delete().then(() => {
            //console.log("Document successfully deleted!");


        }).catch((error) => {
            //console.error("Error removing document: ", error);
        });
        this.setState({
            
            docArray: this.state.docArray.slice(val,1),
            friendNameArray: this.state.friendNameArray.slice(val,1),

        });
    }

    acceptHandler = val => {
        
        var db = firebase.firestore();
        const info = {
            email: '',
            firstN: '',
            lastN: '',
            latitude: '',
            longitude: '',
            phoneNum: ''
        }

        db.collection("users").doc(this.props.user.docId).collection("requests").doc(this.state.docArray[val]).get()
            .then(doc => {

                info.email = doc.data().email,
                    info.firstN = doc.data().firstN,
                    info.lastN = doc.data().lastN,
                    info.latitude = doc.data().latitude,
                    info.longitude = doc.data().longitude,
                    info.phoneNum = doc.data().phoneNum

            }).catch((error) => {
                //alert("error here")
                //alert("Error adding document: " + error);
            }).then(() => {
                db.collection("users").doc(this.props.user.docId).collection("friends").add(info)
                    .then((docRef) => {
                        //alert("Document written with ID: " + docRef.id);
                        this.removeRequest(val);
                    }).catch((error) => {
                        //alert("error here")
                        //alert("Error adding document: " + error);
                    });
            });
    }

    declineHandler = val => {
        
        this.removeRequest(val);
    }

    render() {
        return (
            <ImageBackground source={require('../screens/Background.png')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.alignment}>
                        <View style={styles.icons}>
                            <TouchableOpacity
                                onPress={this.backArrow}
                            >
                                <Icon size={35} name='ios-arrow-round-back' color='white' />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.mainText}>Requests</Text>
                        <FlatList
                            style={styles.list}
                            data={this.state.friendNameArray}
                            getData={this.state}
                            renderItem={({ item, index }) =>
                                <View style={{ marginBottom: 20, borderRadius: 10 }}>
                                    <Text style={styles.bodyText}>{item}</Text>
                                    <View style={styles.buttons}>
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
                                </View>
                            }
                            keyExtractor={(index) => index.toString()}
                        />
                    </View>
                </View>
            </ImageBackground>
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
        alignItems: 'center'
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
        textAlign: 'center',
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
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    acceptButton: {
        width: '49%',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3F7F40',
        height: 40
    },
    declineButton: {
        width: '49%',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E24A4A',
        height: 40
    }
});


const mapStateToProps = state => {
    return {
        user: state.reference.user,
    };
};


const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestPage);
