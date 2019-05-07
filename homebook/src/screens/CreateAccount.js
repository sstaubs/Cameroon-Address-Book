import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { getUser } from "../store/actions/index";

class CreateAccount extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: '',
    phone: '',
    docId: '',
    visible: false
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

  GetHandler = user => {
    this.props.onGetUser(user);
  };

  isEmailVerified = () => {
    //var user = firebase.auth().currentUser;

    alert("An account has been created using this email that has not been verified. Please go to 'Forgot Password' on the login screen to send an email that will enable you to change your password.");

    /* if (user.emailVerified) {
       alert("This email is already in use. Please select a different email.")
       //pop
     } else {
       var db = firebase.firestore();

       db.collection("users").where("uid", "==", firebase.auth().currentUser.uid).get().then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
           db.collection("users").doc(doc.id).delete();
         })
       }).then(() => {
         user.delete().then(() => {
           // User deleted.
           alert("made it here");

         }).catch(() => {
           // An error happened.
         });
       }).catch(function (error) {
         alert("Error getting documents: " + error);
       });
     }*/
  }

  confirmHandler = val => {
    var that = this;
    if (this.passwordConfirm()) {
      //if (this.isEmailUsed()) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          var user = firebase.auth().currentUser;

          user.sendEmailVerification().then(function () {
            // Email sent.
          }).catch(function (error) {
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
            this.GetHandler(user)
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
          } else if (errorCode == 'auth/email-already-in-use') {
            //alert(this);
            that.isEmailVerified();
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
      // }
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
            <Icon size={35} name='ios-arrow-round-back' color='white' />
          </TouchableOpacity>
        </View>
        <Text style={styles.mainText}>Create Account</Text>
        <KeyboardAvoidingView behavior='padding' style={styles.alignment}>
          <ScrollView style={{ width: '100%' }} keyboardDismissMode='on-drag'>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.userInput}
              placeholder='John'
              placeholderTextColor='gray'
              onChangeText={this.firstNameHandler}
              returnKeyType={"next"}
              onSubmitEditing={() => { this.secondTextInput.focus(); }}
              blurOnSubmit={false}
            />
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.userInput}
              placeholder='Doe'
              placeholderTextColor='gray'
              onChangeText={this.lastNameHandler}
              ref={(input) => { this.secondTextInput = input; }}
              returnKeyType={"next"}
              onSubmitEditing={() => { this.thirdTextInput.focus(); }}
              blurOnSubmit={false}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.userInput}
              placeholder='••••••••••'
              placeholderTextColor='gray'
              onChangeText={this.passwordHandler}
              ref={(input) => { this.thirdTextInput = input; }}
              returnKeyType={"next"}
              onSubmitEditing={() => { this.fourthTextInput.focus(); }}
              blurOnSubmit={false}
            />
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.userInput}
              placeholder='••••••••••'
              placeholderTextColor='gray'
              onChangeText={this.confirmPassHandler}
              ref={(input) => { this.fourthTextInput = input; }}
              returnKeyType={"next"}
              onSubmitEditing={() => { this.fifthTextInput.focus(); }}
              blurOnSubmit={false}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              style={styles.userInput}
              placeholder='johndoe@example.com'
              placeholderTextColor='gray'
              onChangeText={this.emailHandler}
              ref={(input) => { this.fifthTextInput = input; }}
              returnKeyType={"next"}
              onSubmitEditing={() => { this.sixthTextInput.focus(); }}
              blurOnSubmit={false}
            />
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              keyboardType='number-pad'
              style={styles.userInput}
              placeholder='(123) 456-7890'
              placeholderTextColor='gray'
              onChangeText={this.phoneHandler}
              ref={(input) => { this.sixthTextInput = input; }}
              returnKeyType={"done"}
              blurOnSubmit={true}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={this.confirmHandler}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>CONTINUE</Text>
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
    marginTop: 40
  },
  mainText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 15
  },
  label: {
    color: '#7ABAF2',
    marginTop: 25,
    fontSize: 13
  },
  userInput: {
    borderColor: '#7ABAF2',
    borderBottomWidth: 1,
    height: 40,
    fontSize: 17,
    color: 'white'
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

const mapDispatchToProps = dispatch => {
  return {
    onGetUser: user => dispatch(getUser(user)),


  };
};

export default connect(null, mapDispatchToProps)(CreateAccount);
