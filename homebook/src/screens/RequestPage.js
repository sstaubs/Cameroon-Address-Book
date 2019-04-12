import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';


class RequestPage extends Component {
   

    render() {
        return (
            <Text>Hello</Text>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282828',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    alignment: {
        left: '3.5%'
    },
    closeIcon: {
        marginTop: 55
    },
    innerText: {
        color: 'white',
        fontSize: 25
    },
    textPadding: {
        paddingTop: 30
    },
    innerRedText: {
        color: '#E24A4A',
        fontSize: 25
    }
});


export default RequestPage;