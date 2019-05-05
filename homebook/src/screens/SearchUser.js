import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

class SearchUser extends Component {
    state = {
        email: '',
        firstname: '',
        lastname: '',
        phone:'',
        latitude: '',
        longitude: '',
        docId: '',
        friendNameArray: [],
        referenceArray: [],
        searchedEmail: '',

    };

    backArrow = () => Navigation.pop(this.props.componentId);

    pushToHome = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'HomeScreen'
            }
        });
    }

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
                    <Icon size={25} name='ios-arrow-back' color='white' />
                </TouchableOpacity>
                <Text style={styles.mainText}>Find User</Text>
                <Text style={styles.subText}>Email</Text>
                <TextInput
                    keyboardType="number-pad"
                    style={styles.phoneInfo}
                    placeholder="Email"
                    placeholderTextColor="gray"
                    onChangeText={this.searchedEmailHandler}
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={this.searchBySearchedEmail}
                >
                    <Text style={{ color: 'white', fontWeight: '500' }}>SUBMIT</Text>
                </TouchableOpacity>

                <FlatList
                    style={styles.list}
                    data={
                        this.state.friendNameArray
                    }
                    renderItem={({ item, index }) =>
                        <TouchableOpacity
                            onPress={() => this.SendRequest(this.state.referenceArray[index])}
                        >
                            <Text style={styles.bodyText}>{item}</Text>

                        </TouchableOpacity>
                    }
                    keyExtractor={(index) => index.toString()}
                />
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
        position: 'relative',
        right: 140,
        marginTop: 70
    },
    mainText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        width: 300,
        textAlign: 'center',
        marginTop: 24
    },
    subText: {
        color: 'white',
        fontSize: 17,
        marginTop: 50,
        width: 300
    },
    phoneInfo: {
        width: 300,
        marginTop: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: 'white',
        fontSize: 17,
        height: 32,
        color: 'white'
    },
    sendButton: {
        width: 300,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4A90E2',
        height: 32
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
        user: state.reference.user,

    };
};


const mapDispatchToProps = dispatch => {
    return {
       

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
