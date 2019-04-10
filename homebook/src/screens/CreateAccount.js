import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';

class CreateAccount extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: '',
    phone: ''
  };

  passwordConfirm = () => {
    if (this.state.password != this.state.confirmpassword) {
      alert("Password does not match");
      return false;
    }
    return true;
  };

  pushSetLocation = () => Navigation.push(this.props.componentId, {
    component: {
      name: 'SetLocation'
    }
  });

  backArrow = () => Navigation.pop(this.props.componentId, {
    component: {
      name: 'LoginScreen'
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

  phoneHandler = val => {
    this.setState({
      phone: val,
    });
  };

  emailHandler = val => {
    this.setState({
      email: val,
    });
  };

  passwordHandler = val => {
    this.setState({
      password: val,
    });
  };

  confirmPassHandler = val => {
    this.setState({
      confirmpassword: val,
    });
  };

  confirmHandler = val => {
    if (this.passwordConfirm()) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          var user = firebase.auth().currentUser;
          if (user) {
            const accountInfo = {
              firstN: this.state.firstName,
              lastN: this.state.lastName,
              email: this.state.email,
              phoneNum: this.state.phone,
              uid: user.uid
            };
            var db = firebase.firestore();
            db.collection("users").add(accountInfo)
              .then(function (docRef) {
                //alert("Document written with ID: " + docRef.id);
              })
              .catch(function (error) {
                console.error("Error adding document: ", error);
              });
            this.pushSetLocation()
          }
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.alignment}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={this.backArrow}
          >
            <Icon size={25} name='ios-arrow-back' color='white' />
          </TouchableOpacity>
          <Text style={styles.mainText}>Create Account</Text>
          <Text style={styles.subText}>First Name</Text>
          <TextInput
            style={styles.phoneInfo}
            placeholder='First Name'
            placeholderTextColor='gray'
            onChangeText={this.firstNameHandler}
          />
          <Text style={styles.sub2Text}>Last Name</Text>
          <TextInput
            style={styles.phoneInfo}
            placeholder='Last Name'
            placeholderTextColor='gray'
            onChangeText={this.lastNameHandler}
          />
          <Text style={styles.sub2Text}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.phoneInfo}
            placeholder='Password'
            placeholderTextColor='gray'
            onChangeText={this.passwordHandler}
          />
          <Text style={styles.sub2Text}>Confirm Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.phoneInfo}
            placeholder='Enter Password'
            placeholderTextColor='gray'
            onChangeText={this.confirmPassHandler}
          />
          <Text style={styles.sub2Text}>Phone Number</Text>
          <TextInput
            keyboardType='number-pad'
            style={styles.phoneInfo}
            placeholder='Enter Phone Number'
            placeholderTextColor='gray'
            onChangeText={this.phoneHandler}
          />
          <Text style={styles.sub2Text}>Email</Text>
          <TextInput
            autoCapitalize='none'
            keyboardType='email-address'
            style={styles.phoneInfo}
            placeholder='Enter Email'
            placeholderTextColor='gray'
            onChangeText={this.emailHandler}
          />
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={this.confirmHandler}
          >
            <Text style={{ color: '#222222', fontWeight: '500' }}>CONFIRM</Text>
          </TouchableOpacity>
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
    backgroundColor: '#222222'
  },
  alignment: {
    width: '80%'
  },
  backIcon: {
    flexDirection: 'row',
    marginTop: 55
  },
  mainText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24
  },
  subText: {
    color: 'white',
    fontSize: 17,
    marginTop: 50
  },
  sub2Text: {
    color: 'white',
    fontSize: 17,
    marginTop: 20
  },
  phoneInfo: {
    marginTop: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: 'white',
    fontSize: 17,
    height: 32,
    color: 'white'
  },
  confirmButton: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#70B456',
    height: 32
  }
});

export default CreateAccount;