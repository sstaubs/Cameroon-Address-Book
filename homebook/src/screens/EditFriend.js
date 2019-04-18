import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';

import { connect } from 'react-redux';


class EditFriend extends Component {
    state = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        docId: '',
        focusedLocation: {
            longitude: 0,
            latitude: 0,
            latitudeDelta: 0.0122,
            longitudeDelta:
                Dimensions.get("window").width /
                Dimensions.get("window").height *
                0.0122
        }
    };

    pushCloseButton = () => Navigation.pop(this.props.componentId, {
        component: {
            name: 'FriendProfile'
        }
    });

    pushFriendProfile = () => Navigation.pop(this.props.componentId, {
        component: {
            name: 'FriendProfile'
        }
    });

    firstNameHandler = val => {
        this.setState({
            firstName: val,
        });
    };

    lastNameHandler = val => {
        this.setState({
            lastName: val,
        });
    };

    phoneNumberHandler = val => {
        this.setState({
            phone: val,
        });
    };

    emailHandler = val => {
        this.setState({
            email: val,
        });
    };

    componentDidMount() {
        var db = firebase.firestore();

        db.collection("users").where("uid", "==", firebase.auth().currentUser.uid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //alert(doc.data().email);
                //alert(doc.id, " => ", doc.data());
                //alert(doc)


                this.setState({


                    docId: doc.id,
                });


            });


        }).then(() => {
            db.collection("users").doc(this.state.docId).collection("friends").doc(this.props.refpoint).get()
                .then(doc => {

                    this.setState({
                        firstName: doc.data().firstN,
                        lastName: doc.data().lastN,
                        phone: doc.data().phoneNum,
                        email: doc.data().email,
                        
                        focusedLocation: {
                            ...this.state.focusedLocation,
                            longitude: doc.data().longitude,
                            latitude: doc.data().latitude,
                        },
                    })

                }).catch(function (error) {
                    alert("Error getting documents: " + error);
                });
        }).catch(function (error) {
            alert("Error getting documents: " + error);
        });
    }

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        });
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            };
        });
    };

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvent);
        },
            err => {
                console.log(err);
                alert("Fetching the Position failed, please pick one manually!");
            })
    }

    confirmHandler = val => {
        //alert(this.state.phone);
        const accountInfo = {
            firstN: this.state.firstName,
            lastN: this.state.lastName,
            phoneNum: this.state.phone,
            email: this.state.email,
            latitude: this.state.focusedLocation.latitude,
            longitude: this.state.focusedLocation.longitude,
        };
        var db = firebase.firestore();
        db.collection("users").doc(this.state.docId).collection("friends").doc(this.props.refpoint).update(accountInfo)
            .then(() => {
                console.log("Document successfully updated!");
            }).then(() => {
                this.pushFriendProfile()
            })
            .catch((error) => {
                // The document probably doesn't exist.
                alert("Error updating document: " + error);
            });
    };

    render() {
        marker = <MapView.Marker coordinate={this.state.focusedLocation} />
        return (
            <View style={styles.container}>
                <View style={styles.icons}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={this.pushCloseButton}>
                        <Icon size={35} name='ios-close' color='white' />
                    </TouchableOpacity>
                </View>
                <Text style={styles.mainText}>Edit Contact</Text>

                <ScrollView style={styles.alignment}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.userInput}
                        value={this.state.firstName}
                        onChangeText={this.firstNameHandler}
                    />
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.userInput}
                        value={this.state.lastName}
                        onChangeText={this.lastNameHandler}
                    />
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.userInput}
                        value={this.state.phone}
                        onChangeText={this.phoneNumberHandler}
                    />
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.userInput}
                        autoCapitalize='none'
                        value={this.state.email}
                        onChangeText={this.emailHandler}
                    />
                    <Text style={styles.editLocation}>Edit Location</Text>
                    <MapView
                        initialRegion={this.state.focusedLocation}
                        region={this.state.focusedLocation}
                        style={styles.map}
                        showsUserLocation={true}
                        onPress={this.pickLocationHandler}
                        ref={ref => this.map = ref}
                    >
                        {marker}
                    </MapView>
                    <TouchableOpacity
                        style={styles.locateButton}
                        onPress={this.getLocationHandler}
                    >
                        <Text style={{ color: '#3F7F40', fontSize: 16, fontWeight: '700' }}>LOCATE ME!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={this.confirmHandler}
                    >
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>SUBMIT</Text>
                    </TouchableOpacity>
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#222222',
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 55,
        width: '85%'
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 25,
        color: 'white'
    },
    alignment: {
        width: '85%'
    },
    label: {
        color: '#ffffe0',
        paddingTop: 30,
        fontSize: 13
    },
    userInput: {
        borderColor: '#ffffe0',
        borderBottomWidth: 1,
        height: 40,
        fontSize: 17,
        color: 'lightgray'
    },
    editLocation: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white',
        textAlign: 'center'
    },
    map: {
        width: '100%',
        height: 300,
        marginTop: 20
    },
    locateButton: {
        width: '100%',
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        height: 40
    },
    confirmButton: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3F7F40',
        borderRadius: 20,
        height: 40
    }
});

const mapStateToProps = state => {
    return {
        refpoint: state.reference.friendref,
    };
};


export default connect(mapStateToProps)(EditFriend);
