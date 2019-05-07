import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native';
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
      longitude: 37.7900352,
      latitude: -122.4013726,
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
        <Text style={styles.mainText}>Add Contact</Text>
        <ScrollView style={{ width: '100%' }}>
          <View style={{ width: '85%', left: '7.5%' }}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.userInput}
              placeholder="First Name"
              placeholderTextColor="gray"
              onChangeText={this.firstNameHandler}
              returnKeyType={"next"}
              onSubmitEditing={() => { this.secondTextInput.focus(); }}
              blurOnSubmit={false}
            />
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.userInput}
              placeholder="Last Name"
              placeholderTextColor="gray"
              onChangeText={this.lastNameHandler}
              ref={(input) => { this.secondTextInput = input; }}
              returnKeyType={"next"}
              onSubmitEditing={() => { this.thirdTextInput.focus(); }}
              blurOnSubmit={false}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.userInput}
              autoCapitalize='none'
              autoCorrect={false}
              placeholder='Email'
              keyboardType='email-address'
              placeholderTextColor="gray"
              onChangeText={this.emailHandler}
              ref={(input) => { this.thirdTextInput = input; }}
              returnKeyType={"next"}
              onSubmitEditing={() => { this.fourthTextInput.focus(); }}
              blurOnSubmit={false}
            />
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.userInput}
              keyboardType='number-pad'
              placeholder="Phone Number"
              placeholderTextColor="gray"
              onChangeText={this.phoneNumberHandler}
              ref={(input) => { this.fourthTextInput = input; }}
              returnKeyType={"done"}
              blurOnSubmit={true}
            />
            <Text style={styles.locationText}>Set Location</Text>
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
            initialRegion={this.state.focusedLocation}
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
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>ADD CONTACT</Text>
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
  closeIcon: {
    marginTop: 40,
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
  locationText: {
    marginTop: 17,
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

export default AddUser;