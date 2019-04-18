import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
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
        <View style={styles.iconAlignment}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={this.backArrow}
          >
            <Icon size={25} name='ios-arrow-back' color='white' />
          </TouchableOpacity>
        </View>
        <Text style={styles.mainText}>Create Account</Text>
        <ScrollView style={styles.alignment}>
          <KeyboardAvoidingView behavior='padding'>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.userInput}
              placeholder='John'
              placeholderTextColor='gray'
              onChangeText={this.firstNameHandler}
            />
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.userInput}
              placeholder='Doe'
              placeholderTextColor='gray'
              onChangeText={this.lastNameHandler}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.userInput}
              placeholder='••••••••••'
              placeholderTextColor='gray'
              onChangeText={this.passwordHandler}
            />
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.userInput}
              placeholder='••••••••••'
              placeholderTextColor='gray'
              onChangeText={this.confirmPassHandler}
            />
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              keyboardType='number-pad'
              style={styles.userInput}
              placeholder='(123) 456-7890'
              placeholderTextColor='gray'
              onChangeText={this.phoneHandler}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              style={styles.userInput}
              placeholder='example@gmail.com'
              placeholderTextColor='gray'
              onChangeText={this.emailHandler}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={this.confirmHandler}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>CONTINUE</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
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
    backgroundColor: '#222222'
  },
  alignment: {
    width: '85%'
  },
  iconAlignment: {
    width: '85%'
  },
  backIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 35
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
    marginTop: 20
  },
  label: {
    color: '#7ABAF2',
    paddingTop: 25,
    fontSize: 13
  },
  userInput: {
    borderColor: '#7ABAF2',
    borderBottomWidth: 1,
    height: 40,
    fontSize: 17,
    color: 'white'
  },
  confirmButton: {
    marginTop: 35,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3F7F40',
    borderRadius: 20,
    height: 40
  }
});

export default CreateAccount;