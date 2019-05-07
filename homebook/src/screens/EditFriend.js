import React, { Component } from 'react';
import { ImageBackground, ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';

import { connect } from 'react-redux';
import { editFriend } from "../store/actions/index";


class EditFriend extends Component {
    state = {
        firstName: this.props.friend.firstN,
        lastName: this.props.friend.lastN,
        phone: this.props.friend.phone,
        email: this.props.friend.email,
        docId: this.props.friend.docId,


        focusedLocation: {
            longitude: this.props.friend.longitude,
            latitude: this.props.friend.latitude,
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

    confirmHandler = () => {

        const accountInfo = {
            firstN: this.state.firstName,
            lastN: this.state.lastName,
            docId: this.state.docId,
            phone: this.state.phone,
            email: this.state.email,
            longitude: this.state.focusedLocation.longitude,
            latitude: this.state.focusedLocation.latitude,
        };
        this.props.onEditFriend(this.props.user.docId, accountInfo.docId, accountInfo);
        this.pushFriendProfile();
    };

    render() {
        marker = <MapView.Marker coordinate={this.state.focusedLocation} />
        return (
            <ImageBackground source={require('../screens/Background.png')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.icons}>
                        <TouchableOpacity
                            style={styles.closeIcon}
                            onPress={this.pushCloseButton}>
                            <Icon size={35} name='ios-close' color='white' />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.mainText}>Edit Contact</Text>

                    <ScrollView style={{ width: '100%' }} indicatorStyle='white' keyboardDismissMode='on-drag'>
                        <View style={styles.alignment}>
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
                            <Text style={styles.editLocation}>Change Location</Text>
                            <TouchableOpacity
                                onPress={this.getLocationHandler}
                                style={styles.touchableLocation}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon size={25} name='ios-navigate' color='#7ABAF2' />
                                    <Text style={styles.currentLocation}>  Current Location</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <MapView
                            region={this.state.focusedLocation}
                            style={styles.map}
                            showsUserLocation={true}
                            onPress={this.pickLocationHandler}
                            ref={ref => this.map = ref}
                        >
                            {marker}
                        </MapView>
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.bottomButton}
                        onPress={this.confirmHandler}
                    >
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>UPDATE</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
        width: '85%'
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 25,
        color: 'white'
    },
    alignment: {
        width: '85%',
        left: '7.5%'
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
        color: 'lightgray'
    },
    editLocation: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white',
        textAlign: 'center'
    },
    touchableLocation: {
        marginTop: 10,
        alignItems: 'center'
    },
    currentLocation: {
        fontSize: 17,
        color: '#7ABAF2'
    },
    map: {
        width: '100%',
        height: 300,
        marginTop: 10,
        marginBottom: 60
    },
    bottomButton: {
        width: '100%',
        position: 'absolute',
        height: 55,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3F7F40'
    }
});

const mapStateToProps = state => {
    return {
        user: state.reference.user,
        friend: state.reference.friend,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onEditFriend: (userId, ref, accountInfo) => dispatch(editFriend(userId, ref, accountInfo)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFriend);
