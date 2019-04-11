import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

class Settings extends Component {
  state = {

  };

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.alignment}>

            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    alignment: {

    }
});

export default Settings;