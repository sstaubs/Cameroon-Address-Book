import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';

class AddUser extends Component {
  state = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    docId: '',
    focusedLocation: {
      longitude: '',
      latitude: '',
      latitudeDelta: 0.0122,
      longitudeDelta:
        Dimensions.get("window").width /
        Dimensions.get("window").height *
        0.0122
    }

  };

  pushCloseButton = () => Navigation.pop(this.props.componentId, {
    component: {
      name: 'AddUser'
    }
  });

  popHomeScreen() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'HomeScreen'
      }
    });
  }

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

  componentDidMount() {
    var db = firebase.firestore();
    db.collection("users").where("uid", "==", firebase.auth().currentUser.uid).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //alert(doc.data().email);
        //alert(doc.id, " => ", doc.data());
        this.setState({
          docId: doc.id,
        });
      });
    }).catch(function (error) {
      alert("Error getting documents: " + error);
    });
  }

  confirmHandler = val => {

    var db = firebase.firestore();


    const friendsInfo = {
      firstN: this.state.firstName,
      lastN: this.state.lastName,
      phoneNum: this.state.phone,
      email: this.state.email,
      latitude: this.state.focusedLocation.latitude,
      longitude: this.state.focusedLocation.longitude,

    };
    db.collection("users").doc(this.state.docId).collection("friends").add(friendsInfo)
      .then((docRef) => {
        //alert("Document written with ID: " + docRef.id);
      }).catch((error) => {
        //alert("error here")
        //alert("Error adding document: " + error);
      });

    this.popHomeScreen()
  };

  render() {

    let marker = null;
    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />
    }

    return (
      <View style={styles.container}>
        <View style={styles.icons}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={this.pushCloseButton}>
            <Icon size={35} name='ios-close' color='white' />
          </TouchableOpacity>
        </View>
        <Text style={styles.mainText}>Add Contact</Text>
        <TextInput
          style={styles.textInputStyle}
          placeholder="First Name"
          placeholderTextColor="gray"
          onChangeText={this.firstNameHandler}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Last Name"
          placeholderTextColor="gray"
          onChangeText={this.lastNameHandler}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Phone Number"
          placeholderTextColor="gray"
          onChangeText={this.phoneNumberHandler}
        />
        <TextInput
          style={styles.textInputStyle}
          autoCapitalize='none'
          placeholder="Email"
          placeholderTextColor="gray"
          onChangeText={this.emailHandler}
        />
        <MapView
          region={this.state.focusedLocation}
          style={styles.map}
          ref={ref => this.map = ref}
        >
          {marker}
        </MapView>
        <TouchableOpacity
          style={styles.locateButton}
          onPress={this.getLocationHandler}
        >
          <Text style={{ color: 'white', fontWeight: '500' }}>LOCATE ME!</Text>
        </TouchableOpacity>
    
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={this.confirmHandler}
        >
          <Text style={{ color: 'white', fontWeight: '500' }}>ADD CONTACT</Text>
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
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 55
  },
  closeIcon: {
    position: 'relative',
    right: 140
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 25,
    color: 'white'
  },
  textInputStyle: {
    width: 300,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    fontSize: 17,
    height: 32,
    color: 'white'
  },
  confirmButton: {
    width: 300,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    height: 32
  },
  map: {
    width: '100%',
    height: 300,
    marginTop: 20
  },
  locateButton: {
    width: '80%',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    height: 32
  },
  
});

export default AddUser;