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
                <Text style={styles.mainText}>CREATE ACCOUNT</Text>
                <Text style={styles.subText}>First Name</Text>
                <TextInput
                    keyboardType="number-pad"
                    style={styles.phoneInfo}
                    placeholder="Phone Number"
                    placeholderTextColor="gray"
                    onChangeText={this.phoneHandler}
                  />
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
  
export default CreateAccount;