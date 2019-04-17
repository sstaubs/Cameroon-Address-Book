import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
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
      longitude: 0,
      latitude: 0,
      latitudeDelta: 0.0122,
      longitudeDelta:
        Dimensions.get("window").width /
        Dimensions.get("window").height *
        0.0122
    }

  };

  pushCloseButton = () => {
    Navigation.pop(this.props.componentId);
  }

  popHomeScreen() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'HomeScreen'
      }
    });
  }

  pushSearchUser = () => {

    Navigation.push(this.props.componentId, {
      component: {
        name: 'SearchUser'
      }
    })
  };

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
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={this.pushCloseButton}>
          <Icon size={35} name='ios-close' color='white' />
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.addIcon}
            onPress={this.pushSearchUser}
          >
            <Icon size={35} name='ios-search' color='white' />
          </TouchableOpacity>
        <Text style={styles.mainText}>Add Contact</Text>
        <ScrollView style={styles.alignment}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.userInput}
            placeholder="First Name"
            placeholderTextColor="gray"
            onChangeText={this.firstNameHandler}
          />
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.userInput}
            placeholder="Last Name"
            placeholderTextColor="gray"
            onChangeText={this.lastNameHandler}
          />
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.userInput}
            placeholder="Phone Number"
            placeholderTextColor="gray"
            onChangeText={this.phoneNumberHandler}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.userInput}
            autoCapitalize='none'
            placeholder="Email"
            placeholderTextColor="gray"
            onChangeText={this.emailHandler}
          />

          <Text style={styles.mapText}>Set Location</Text>

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
            <Text style={{ color: '#3F7F40', fontSize: 16, fontWeight: '700' }}>LOCATE ME!</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={this.confirmHandler}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>ADD CONTACT</Text>
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
  closeIcon: {
    marginTop: 55,
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  alignment: {
    width: '85%',
    marginTop: 20
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 25,
    color: 'white'
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
    color: 'white'
  },
  mapText: {
    color: 'white',
    alignItems: 'center',
    marginTop: 20,
    fontSize: 17,
    fontWeight: 'bold'
  },
  map: {
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

export default AddUser;