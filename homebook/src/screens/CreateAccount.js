import React, {Component} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity} from 'react-native';

class CreateAccount extends Component {
  state = {
    firstName: '',
    lastName: '',
    phone: '',
    password: ''
  };
  firstNameHandler = val => {
    this.setState({
      firstName: val,
    });
  };
  lastNameHandler= val => {
    this.setState({
      lastName: val,
    });
  };

  phoneHandler = val => {
    this.setState({
      phone: val,
    });
  };

  passwordHandler = val => {
    this.setState({
      password: val,
    });
  };

  confirmHandler = val => {
    const accountInfo = {
      fname: this.state.firstName,
      lname: this.state.lastName,
      phoneNum: this.state.phone,
      passW: this.state.password
    };
    fetch("https://homebook-c9e3b.firebaseio.com/createAccount.json",{
      method: "POST",
      body: JSON.stringify(accountInfo)
    })
    .catch(err=> console.log(err))
    .then(res =>res.json())
    .then(parsedRes =>{
      console.log(parsedRes);
    });

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
          keyboardType="number-pad"
          style={styles.phoneInfo}
          placeholder="Enter Phone Number"
          placeholderTextColor="gray"
          onChangeText={this.phoneHandler}
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