import React, {Component} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity} from 'react-native';

class CreateAccount extends Component {
    state = {
        phone: '',
        password: ''
      };

    phoneHandler = val => {
        this.setState({
            phone: val,
        });
    };

    render(){
      return(
          <View style={styles.container}>
              <Text style={styles.mainText}>Create Account</Text>
              <Text style={styles.subText}>First Name</Text>
              <TextInput
                  keyboardType="number-pad"
                  style={styles.phoneInfo}
                  placeholder="First Name"
                  placeholderTextColor="gray"
                  onChangeText={this.phoneHandler}
                />
              <Text style={styles.sub2Text}>Last Name</Text>
              <TextInput
                  keyboardType="number-pad"
                  style={styles.phoneInfo}
                  placeholder="Last Name"
                  placeholderTextColor="gray"
                  onChangeText={this.phoneHandler}
                />
              <Text style={styles.sub2Text}>Password</Text>
              <TextInput
                  keyboardType="number-pad"
                  style={styles.phoneInfo}
                  placeholder="Password"
                  placeholderTextColor="gray"
                  onChangeText={this.phoneHandler}
                />
              <Text style={styles.sub2Text}>Confirm Password</Text>
              <TextInput
                  keyboardType="number-pad"
                  style={styles.phoneInfo}
                  placeholder="Enter Password"
                  placeholderTextColor="gray"
                  onChangeText={this.phoneHandler}
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
                  onPress={this.phoneHandler}
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