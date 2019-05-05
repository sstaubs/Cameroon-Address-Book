import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';
import { OpenMapDirections } from 'react-native-navigation-directions';

class UserProfile extends Component {
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
      name: 'UserProfile'
    }
  });

  pushEditButton = () => Navigation.push(this.props.componentId, {
    component: {
      name: 'EditUser'
    }
  });


  pushRequestPage = () => Navigation.push(this.props.componentId, {
    component: {
      name: 'RequestPage'
    }
  });

  showDirections = () => {


    const endPoint = {
      longitude: this.state.focusedLocation.longitude,
      latitude: this.state.focusedLocation.latitude,
    }

		const transportPlan = 'd';

    OpenMapDirections(null,endPoint, transportPlan).then(res => {
      console.log(res)
    });
  }


  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentDidDisappear() {
    //no current function
  }

  componentDidAppear() {
    var db = firebase.firestore();
    db.collection("users").where("uid", "==", firebase.auth().currentUser.uid).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //alert(doc.data().email);
        //alert(doc.id, " => ", doc.data());
        //alert(doc)
        this.setState({
          firstname: doc.data().firstN,
          lastname: doc.data().lastN,
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

  render() {
    marker = <MapView.Marker coordinate={this.state.focusedLocation} />
    return (
      <View style={styles.container}>
        <View style={styles.icons}>
          <TouchableOpacity
            onPress={this.pushCloseButton}>
            <Icon size={35} name='ios-arrow-round-back' color='white' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.pushEditButton}>
            <Text style={{ color: 'white', fontSize: 16 }}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.alignment}>
          <Text style={styles.mainText}>{this.state.firstname} {this.state.lastname}</Text>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={this.pushRequestPage}>
            <Icon size={35} name='ios-alert' color='white' />
          </TouchableOpacity>
          <Text style={styles.category}>Phone Number</Text>
          <Text style={styles.textInputStyle}>{this.state.phone}</Text>
          <Text style={styles.category}>Email</Text>
          <Text style={styles.textInputStyle}>{this.state.email}</Text>
          <Text style={styles.location}>Location</Text>
        </View>
          <MapView
            region={this.state.focusedLocation}
            style={styles.map}
            ref={ref => this.map = ref}
          >
            {marker}
          </MapView>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={this.showDirections}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>Get Directions</Text>
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
    color: '#7ABAF2'
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
    height: 350,
    marginTop: 10
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

export default UserProfile;