import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import * as firebase from 'firebase';




class CreateAccount extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  pushHomeScreen() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'HomeScreen'
      }
    });
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

  confirmHandler = val => {

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
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

    const accountInfo = {
      fname: this.state.firstName,
      lname: this.state.lastName,
      email: this.state.email,
      passW: this.state.password
    };
    fetch("https://homebook-c9e3b.firebaseio.com/createAccount.json", {
      method: "POST",
      body: JSON.stringify(accountInfo)
    })
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
      });

    this.pushHomeScreen()




  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.mainText}>Create Account</Text>
        <Text style={styles.subText}>First Name</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.phoneInfo}
          placeholder="First Name"
          placeholderTextColor="gray"
          onChangeText={this.firstNameHandler}
        />
        <Text style={styles.sub2Text}>Last Name</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.phoneInfo}
          placeholder="Last Name"
          placeholderTextColor="gray"
          onChangeText={this.lastNameHandler}
        />
        <Text style={styles.sub2Text}>Password</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.phoneInfo}
          placeholder="Password"
          placeholderTextColor="gray"
          onChangeText={this.passwordHandler}
        />
        <Text style={styles.sub2Text}>Confirm Password</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.phoneInfo}
          placeholder="Enter Password"
          placeholderTextColor="gray"
          onChangeText={this.passwordHandler}
        />
        <Text style={styles.sub2Text}>Phone Number</Text>
        <TextInput
          style={styles.phoneInfo}
          placeholder="Enter Phone Number"
          placeholderTextColor="gray"
          onChangeText={this.emailHandler}
        />
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={this.confirmHandler}
        >
          <Text style={{ color: 'white', fontWeight: '500' }}>CONFIRM</Text>
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
    padding: 94,
    backgroundColor: '#222222',
  },
  mainText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    width: 300,
    textAlign: 'center'
  },
  subText: {
    color: 'white',
    fontSize: 17,
    marginTop: 50,
    width: 300
  },
  sub2Text: {
    color: 'white',
    fontSize: 17,
    marginTop: 20,
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
  confirmButton: {
    width: 300,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    height: 32
  }
});

export default CreateAccount;