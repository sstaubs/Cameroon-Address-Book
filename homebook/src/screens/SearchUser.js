import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

class SearchUser extends Component {
    state = {
        email: '',
        firstname: '',
        lastname: '',
        phone: '',
        latitude: '',
        longitude: '',
        docId: '',
        friendNameArray: [],
        referenceArray: [],
        searchedEmail: '',
    };

    backArrow = () => Navigation.pop(this.props.componentId);

    pushToHome = () => Navigation.pop(this.props.componentId);

    searchedEmailHandler = val => {
        this.setState({
            searchedEmail: val,
        });
    };
    searchBySearchedEmail = () => {

        this.setState({
            referenceArray: [],
            friendNameArray: [],

        });

        var db = firebase.firestore();
        db.collection("users").where("email", "==", this.state.searchedEmail).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    this.setState({
                        referenceArray: this.state.referenceArray.concat([doc.id]),
                        friendNameArray: this.state.friendNameArray.concat([doc.data().firstN + " " + doc.data().lastN]),

                    });

                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });


    };

    SendRequest = val => {
        Alert.alert(
            'Contact Shared'
        )

        var db = firebase.firestore();

        const requesterInfo = {
            firstN: this.props.user.firstN,
            lastN: this.props.user.lastN,
            phoneNum: this.props.user.phone,
            email: this.props.user.email,
            latitude: this.props.user.latitude,
            longitude: this.props.user.longitude
        };

        db.collection("users").doc(val).collection("requests").add(requesterInfo)
            .then((docRef) => {
                this.pushToHome();
            }).catch((error) => {
                //alert("error here")
                //alert("Error adding document: " + error);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.backIcon}
                    onPress={this.backArrow}
                >
                    <Icon size={35} name='ios-arrow-round-back' color='white' />
                </TouchableOpacity>
                <View style={styles.alignment}>
                    <Text style={styles.mainText}>Share Contact</Text>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        keyboardType="email-address"
                        style={styles.userInput}
                        placeholder="johndoe@example.com"
                        placeholderTextColor="gray"
                        returnKeyType="done"
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={this.searchedEmailHandler}
                    />
                    <FlatList
                        style={styles.list}
                        data={this.state.friendNameArray}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity
                                onPress={() => this.SendRequest(this.state.referenceArray[index])}
                                style={{ backgroundColor: '#3F7F40', borderRadius: 50, marginTop: 20 }}
                            >
                                <Text style={styles.bodyText}>
                                    <Icon size={20} name='ios-send' color='white' />  {item}
                                </Text>
                            </TouchableOpacity>
                        }
                        keyExtractor={(index) => index.toString()}
                    />
                </View>
                <TouchableOpacity
                    style={styles.bottomButton}
                    onPress={this.searchBySearchedEmail}
                >
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>SEARCH</Text>
                </TouchableOpacity>
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
    backIcon: {
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
        color: 'white',
        textAlign: 'center'
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
        color: 'white'
    },
    bottomButton: {
        width: '100%',
        position: 'absolute',
        height: 55,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3F7F40'
    },
    list: {
        marginTop: 25
    },
    bodyText: {
        color: 'white',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center'
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
