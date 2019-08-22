import React, { Component } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import { OpenMapDirections } from 'react-native-navigation-directions';
import * as firebase from 'firebase';

import { connect } from 'react-redux';
import { deleteFriend } from "../store/actions/index";

class FriendProfile extends Component {
    state = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        docId: '',
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

    pushCloseButton = () => Navigation.pop(this.props.componentId);

    pushEditButton = () => Navigation.push(this.props.componentId, {
        component: {
            name: 'EditFriend'
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

    deleteUser = () => {
        this.props.onDeleteFriend(this.props.user.docId, this.props.friend.docId)
        Navigation.pop(this.props.componentId);

    }

    componentDidMount() {
        this.navigationEventListener = Navigation.events().bindComponent(this);
    }

    componentDidDisappear() {
        //no current function
    }

    showDirections = () => {
        const endPoint = {
            longitude: this.state.focusedLocation.longitude,
            latitude: this.state.focusedLocation.latitude,
        }
        const transportPlan = 'd';
        OpenMapDirections(null, endPoint, transportPlan).then(res => {
            console.log(res)
        });
    }

    componentDidAppear() {
        this.setState({
            focusedLocation: {
                ...this.state.focusedLocation,
                longitude: this.props.friend.longitude,
                latitude: this.props.friend.latitude,
            },
        });

    }

    render() {
        marker = <MapView.Marker coordinate={this.state.focusedLocation} />
        return (
            <ImageBackground source={require('../screens/Background.png')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container} >
                    <View style={styles.icons}>
                        <TouchableOpacity
                            style={styles.shareIcon}
                            onPress={this.pushCloseButton}>
                            <Icon size={35} name='ios-close' color='white' />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.edit}
                            onPress={this.pushEditButton}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.alignment}>
                        <Text style={styles.mainText}>{this.props.friend.firstN} {this.props.friend.lastN}</Text>
                        <Text style={styles.category}>Phone Number</Text>
                        <Text style={styles.textInputStyle}>{this.props.friend.phone}</Text>
                        <Text style={styles.category}>Email</Text>
                        <Text style={styles.textInputStyle}>{this.props.friend.email}</Text>
                        <Text style={styles.location}>Location</Text>
                    </View>
                    <MapView
                        region={this.state.focusedLocation}
                        style={styles.map}
                        showsUserLocation={true}
                        loadingEnabled={true}
                        ref={ref => this.map = ref}
                    >
                        {marker}
                    </MapView>
                    <TouchableOpacity
                        style={styles.bottomButton}
                        onPress={this.showDirections}
                    >
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>GET DIRECTIONS</Text>
                    </TouchableOpacity>
                    <View style={styles.alignment}>
                        <TouchableOpacity
                            style={styles.pressRedText}
                            onPress={this.deleteUser}
                        >
                            <Text style={styles.redText}>Delete User</Text>
                        </TouchableOpacity>
                    </View>
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
        justifyContent: 'space-between',
        marginTop: 40,
        width: '85%'
    },
    alignment: {
        width: '85%'
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 25,
        color: 'white'
    },
    category: {
        marginTop: 17,
        fontWeight: 'bold',
        fontSize: 17,
        color: '#7ABAF2',
    },
    location: {
        marginTop: 17,
        fontWeight: 'bold',
        fontSize: 17,
        color: '#7ABAF2',
        textAlign: 'center'
    },
    textInputStyle: {
        marginTop: 5,
        fontSize: 17,
        color: 'white',
    },
    map: {
        width: '100%',
        height: 300,
        marginTop: 20
    },
    pressRedText: {
        marginTop: 40,
        borderWidth: 1,
        borderColor: '#E24A4A',
        width: '40%'
    },
    redText: {
        color: '#E24A4A',
        fontSize: 16,
        padding: 10,
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
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
        onDeleteFriend: (userId, ref) => dispatch(deleteFriend(userId, ref)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendProfile);
