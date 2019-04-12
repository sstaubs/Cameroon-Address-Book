import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar } from 'react-native';
import { Navigation } from 'react-native-navigation';
import * as firebase from 'firebase';

class Login extends Component {
  state = {
    email: '',
    password: '',
    firstLoading: true
  };

  pushRecovery = () => Navigation.push(this.props.componentId, {
    component: {
      name: 'RecoveryScreen'
    }
  });

  pushCreateAccount = () => Navigation.push(this.props.componentId, {
    component: {
      name: 'CreateAccountScreen'
    }

  });


  pushHomeScreen = () => Navigation.push(this.props.componentId, {
    sideMenu: {
      left: {
        component: {
          name: 'SideMenu'
        }

      },
      center:{
        component: {
          name: 'HomeScreen'
        }
      }
    }
  });

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

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && this.state.firstLoading && user.emailVerified) {
        this.pushHomeScreen();
      } else {
        this.setState({ firstLoading: false });
      }
    })
  }

  EnterLogin = val => {

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      var user = firebase.auth().currentUser;
      if (user.emailVerified) {
        this.pushHomeScreen();
      } else {
        alert("Email has not yet been verified");
      }
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <View style={styles.alignment}>
          <Text style={styles.mainText}>HomeBook</Text>
          <Text style={styles.supportingText}>Addressing Your Home</Text>
          <TextInput
            autoCapitalize="none"
            keyboardType='email-address'
            style={styles.userInputPhone}
            placeholder="Email"
            placeholderTextColor="gray"
            onChangeText={this.emailHandler}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.userInputPassword}
            placeholder="Password"
            placeholderTextColor="gray"
            onChangeText={this.passwordHandler}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={this.EnterLogin}
          >
            <Text style={{ color: '#222222', fontWeight: '500' }}>LOGIN</Text>
          </TouchableOpacity>

          <Text onPress={this.pushRecovery} style={styles.forgotPassword}>Forgot Password?</Text>
          <View style={styles.signupLine}>
            <Text style={styles.signup}>Don't have an account?</Text>
              <TouchableOpacity>
                <Text onPress={this.pushCreateAccount} style={styles.clickSignup}>Create Account</Text>
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
    alignItems: 'center',
    backgroundColor: '#222222',
  },
  alignment: {
    width: '85%'
  },
  mainText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 200,
    textAlign: 'center'
  },
  supportingText: {
    color: 'white',
    fontSize: 20,
    width: 300,
    textAlign: 'center',
    padding: 5
  },
  userInputPhone: {
    backgroundColor: '#282828',
    padding: 10,
    marginTop: 30,
    fontSize: 17,
    color: 'white'
  },
  userInputPassword: {
    backgroundColor: '#282828',
    padding: 10,
    marginTop: 10,
    fontSize: 17,
    color: 'white'
  },
  loginButton: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#70B456',
    height: 32
  },
  signupLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 260,
    fontSize: 20
  },
  signup: {
    color: 'gray'
  },
  clickSignup: {
    color: '#70B456',
    marginLeft: 10
  },
  forgotPassword: {
    color: 'gray',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center'
  }
});

module.exports = Login;