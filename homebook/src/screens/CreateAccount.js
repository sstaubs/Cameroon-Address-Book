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

          user.sendEmailVerification().then(function() {
            // Email sent.
          }).catch(function(error) {
            // An error happened.
          });
          
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
          <View style={styles.inputs}>
            <TextInput
              style={styles.userInput}
              placeholder='First Name'
              placeholderTextColor='gray'
              onChangeText={this.firstNameHandler}
            />
            <TextInput
              style={styles.userInput}
              placeholder='Last Name'
              placeholderTextColor='gray'
              onChangeText={this.lastNameHandler}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.userInput}
              placeholder='Password'
              placeholderTextColor='gray'
              onChangeText={this.passwordHandler}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.userInput}
              placeholder='Confirm Password'
              placeholderTextColor='gray'
              onChangeText={this.confirmPassHandler}
            />
            <TextInput
              keyboardType='number-pad'
              style={styles.userInput}
              placeholder='Phone Number'
              placeholderTextColor='gray'
              onChangeText={this.phoneHandler}
            />
            <TextInput
              autoCapitalize='none'
              keyboardType='email-address'
              style={styles.userInput}
              placeholder='Email'
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
  inputs: {
    marginTop: 30
  },
  subText: {
    color: 'white',
    fontSize: 17,
    marginTop: 20
  },
  userInput: {
    backgroundColor: '#282828',
    padding: 10,
    marginTop: 15,
    fontSize: 17,
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