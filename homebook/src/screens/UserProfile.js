import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';

class UserProfile extends Component {
  state = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    docId: '',
    longitude:'',
    latitude: '',
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

          firstname: doc.data().firstN,
          lastname: doc.data().lastN,
          phone: doc.data().phoneNum,
          email: doc.data().email,
          docId: doc.id,
          longitude: doc.data().longitude,
          latitude: doc.data().latitude,
        });


      });


    }).catch(function (error) {
      alert("Error getting documents: " + error);
    });


  }



  render() {
    return (
      <View style={styles.container}>
        <View style={styles.icons}>
          <TouchableOpacity
            style={styles.shareIcon}
            onPress={this.pushCloseButton}>
            <Icon size={35} name='ios-close' color='white' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.edit}
            onPress={this.pushEditButton}>
            <Text style={{color: "white"}}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.mainText}>{this.state.firstname} {this.state.lastname}</Text>
        <View style={styles.alignment}>
          <Text style={styles.category}>Phone Number</Text>
          <Text style={styles.textInputStyle}>{this.state.phone}</Text>
          <Text style={styles.category}>Email</Text>
          <Text style={styles.textInputStyle}>{this.state.email}</Text>
          <Text style={styles.category}>Coordinates</Text>
          <Text style={styles.textInputStyle}>Longitude: {this.state.longitude} </Text>
          <Text style={styles.textInputStyle}>Latitude: {this.state.latitude}  </Text>

        </View>
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
  shareIcon: {
    position: 'relative',
    right: 120
  },
  edit: {
    position: 'relative',
    left: 120
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 25,
    color: 'white'
  },
  alignment: {
    marginTop: 15,
    right: 60
  },
  category: {
    marginTop: 23,
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
  },
  textInputStyle: {
    marginTop: 5,
    fontSize: 17,
    color: 'white',
  },
  confirmButton: {
    width: 300,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    height: 32
  }
});

export default UserProfile;