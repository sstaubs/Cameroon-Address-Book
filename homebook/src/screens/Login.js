import React, { Component } from 'react';
import Dialog, { DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar, KeyboardAvoidingView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { getUser } from "../store/actions/index";

class Login extends Component {
  state = {
    email: '',
    password: '',
    firstLoading: true,
    visible: false,
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
      center: {
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
        this.props.onGetUser()

      } else {
        this.setState({ firstLoading: false });
      }
    })
  }

  EnterLogin = val => {



    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      var user = firebase.auth().currentUser;
      if (user.emailVerified) {
        this.props.onGetUser();

      } else {
        this.setState({ visible: true });

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

  ReverifyEmail = () => {
    //In here just create an authenticator where we resend verification email

    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
      // Email sent.
    }).then(() => {
      this.setState({ visible: false });
    }).catch(function (error) {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/too-many-requests') {
        alert('Please wait before requesting another email to be sent');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }

  RecreateAccount = () => {
    // First delete the existing account since its unverified and push user to create account

    var user = firebase.auth().currentUser;
    var db = firebase.firestore();

    db.collection("users").where("uid", "==", firebase.auth().currentUser.uid).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        db.collection("users").doc(doc.id).delete();
      })
    }).then(() => {
      user.delete().then(() => {
        // User deleted.
        this.pushCreateAccount();
      }).catch(() => {
        // An error happened.
      });
    }).catch(function (error) {
      alert("Error getting documents: " + error);
    });
  }

  componentDidUpdate(prevProps) {
    //alert("THat")
    // alert(prevProps.loginVerify +  " and " + this.props.loginVerify)
    if (prevProps.loginVerify != this.props.loginVerify) {

      setTimeout(() => {
        this.pushHomeScreen();
      }, 400);

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.alignment}>
          <Text style={styles.mainText}>HomeBook</Text>
          <Text style={styles.supportingText}>Addressing Your Home</Text>
          <KeyboardAvoidingView behavior='padding'>
            <Text style={styles.label}>Email</Text>
            <TextInput
              autoCapitalize="none"
              keyboardType='email-address'
              style={styles.userInput}
              placeholder="johndoe@example.com"
              placeholderTextColor="gray"
              onChangeText={this.emailHandler}
              returnKeyType={"next"}
              onSubmitEditing={() => { this.secondTextInput.focus(); }}
              blurOnSubmit={false}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.userInput}
              placeholder="••••••••••"
              placeholderTextColor="gray"
              onChangeText={this.passwordHandler}
              ref={(input) => { this.secondTextInput = input; }}
              returnKeyType={"done"}
            />
            <Text onPress={this.pushRecovery} style={styles.forgotPassword}>Forgot Password?</Text>
          </KeyboardAvoidingView>
          <Dialog
            visible={this.state.visible}
            footer={
              <DialogFooter>
                <DialogButton
                  text="Resend Verification"
                  onPress={() => this.ReverifyEmail()}
                />
                <DialogButton
                  text="Recreate Account"
                  onPress={() => this.RecreateAccount()}
                />
              </DialogFooter>
            }
            onTouchOutside={() => {
              this.setState({ visible: false });
            }}
          >
            <DialogContent>
              <Text>This email is already in use but is not verified. Please click Resend Verification to send another verification email. If you have not created an account with this email, please click Recreate Account to make a new account.</Text>
            </DialogContent>
          </Dialog>

        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={this.EnterLogin}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupLine}>
            <Text onPress={this.pushCreateAccount} style={styles.clickSignup}>Create Account</Text>
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
    alignItems: 'center',
    backgroundColor: '#222222',
  },
  alignment: {
    width: '85%'
  },
  mainText: {
    color: '#7ABAF2',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '50%',
    textAlign: 'center'
  },
  supportingText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: '30%'
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
  forgotPassword: {
    color: '#7ABAF2',
    fontSize: 13,
    marginTop: 10,
    textAlign: 'right'
  },
  bottom: {
    width: '100%',
    position: 'absolute',
    bottom: '5%',
    alignItems: 'center'
  },
  loginButton: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F7F40',
    borderRadius: 20,
    height: 40
  },
  signupLine: {
    marginTop: 25,
    fontSize: 18,
    alignItems: 'center'
  },
  clickSignup: {
    color: '#70B456'
  }
});
const mapStateToProps = state => {
  return {
    user: state.reference.user,
    loginVerify: state.reference.loginVerify,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetUser: () => dispatch(getUser()),

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);