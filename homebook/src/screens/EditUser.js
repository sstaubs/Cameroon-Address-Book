import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';

class EditUser extends Component {
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
      name: 'EditUser'
    }
  });

  pushUserProfile = () => Navigation.pop(this.props.componentId, {
    component: {
      name: 'UserProfile'
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
          firstName: doc.data().firstN,
          lastName: doc.data().lastN,
          phone: doc.data().phoneNum,
          email: doc.data().email,
          docId: doc.id,
          focusedLocation: {
            ...this.state.focusedLocation,
            longitude: doc.data().longitude,
            latitude: doc.data().latitude,
          },
        });
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
    db.collection("users").doc(this.state.docId).update(accountInfo)
      .then(() => {
        console.log("Document successfully updated!");
      }).then(() => {
        this.pushUserProfile()
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
            <Text style={styles.category}>First Name</Text>
            <TextInput
              style={styles.textInputStyle}
              value={this.state.firstName}
              onChangeText={this.firstNameHandler}
            />
            <Text style={styles.category}>Last Name</Text>
            <TextInput
              style={styles.textInputStyle}
              value={this.state.lastName}
              onChangeText={this.lastNameHandler}
            />
            <Text style={styles.category}>Phone Number</Text>
            <TextInput
              style={styles.textInputStyle}
              value={this.state.phone}
              onChangeText={this.phoneNumberHandler}
            />
            <Text style={styles.category}>Email</Text>
            <TextInput
              style={styles.textInputStyle}
              autoCapitalize='none'
              value={this.state.email}
              onChangeText={this.emailHandler}
            />
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
              <Text style={{ color: 'white', fontWeight: '500' }}>LOCATE ME!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={this.confirmHandler}
            >
              <Text style={{ color: 'white', fontWeight: '500' }}>SUBMIT</Text>
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
  category: {
    marginTop: 17,
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
  },
  textInputStyle: {
    marginTop: 5,
    fontSize: 17,
    color: 'grey'
  },
  confirmButton: {
    width: '100%',
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
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    height: 32
  },
});

export default EditUser;