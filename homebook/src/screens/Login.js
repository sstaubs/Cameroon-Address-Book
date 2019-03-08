import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import { Navigation } from 'react-native-navigation';


class Login extends Component {
  state = {
    phone: '',
    password: ''
  };

  push = () => Navigation.push(this.props.componentId,{
    component: {
      name: 'RecoveryScreen'
    }
  });

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

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.mainText}>HomeBook</Text>
          <Text style={styles.supportingText}>Addressing Your Home</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.phoneInfo}
            placeholder="Phone Number"
            placeholderTextColor="gray"
            value={this.state.phone}
            onChangeText={this.phoneHandler}
          />
          <TextInput
            style={styles.passwordInfo}
            placeholder="Password"
            placeholderTextColor="gray"
            value={this.state.password}
            onChangeText={this.passwordHandler}
          />
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={this.phoneHandler}
            >
              <Text style={{ color: '#222222', fontWeight: '500' }}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={this.push}
            >
              <Text style={{ color: '#70B456', fontWeight: '500' }}>CREATE ACCOUNT</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.linkText}>FORGOT PASSWORD?</Text>
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
    padding: 200,
    backgroundColor: '#222222',
  },
  mainText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    width: 300,
    textAlign: 'center'
  },
  supportingText: {
    color: 'white',
    fontSize: 20,
    width: 300,
    textAlign: 'center',
    padding: 5
  },
  phoneInfo: {
    width: 300,
    marginTop: 50,
    padding: 5,
    borderWidth: 1,
    borderColor: 'white',
    fontSize: 17,
    height: 32,
    color: 'white'
  },
  passwordInfo: {
    width: 300,
    marginTop: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: 'white',
    fontSize: 17,
    height: 32,
    color: 'white'
  },
  buttons: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  loginButton: {
    width: 145,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#70B456',
    height: 32
  },
  signupButton: {
    width: 145,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#70B456',
    backgroundColor: '#222222',
    height: 32
  },
  linkText: {
    color: 'gray',
    fontSize: 12,
    marginTop: 20
  }
});

module.exports = Login;