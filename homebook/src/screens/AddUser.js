import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';

class AddUser extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

pushCloseButton = () => Navigation.pop(this.props.componentId, {
    component: {
        name: 'AddUser'
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
    var user = firebase.auth().currentUser;
    if (user) {
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
    }
  };

  render() {
    return (
      <View style={styles.container}>
            <View style={styles.icons}>
                <TouchableOpacity
                    style={styles.shareIcon}
                    onPress={this.pushCloseButton}>
                    <Icon size={35} name='ios-close' color='white' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addIcon}>
                    <Icon size={35} name='ios-checkmark' color='white' />
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
          onChangeText={this.emailHandler}
        />
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
    shareIcon: {
        position: 'relative',
        right: 120
    },
    addIcon: {
        position: 'relative',
        left: 120
    },
    mainText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        width: 300,
        textAlign: 'center'
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
    }
});

export default AddUser;