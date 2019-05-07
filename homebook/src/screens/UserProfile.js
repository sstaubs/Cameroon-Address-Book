import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';
import { OpenMapDirections } from 'react-native-navigation-directions';
import { connect } from 'react-redux';

class UserProfile extends Component {
  state = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    docId: '',
    focusedLocation: {
      longitude: this.props.user.longitude,
      latitude: this.props.user.latitude,
      latitudeDelta: 0.0122,
      longitudeDelta:
        Dimensions.get("window").width /
        Dimensions.get("window").height *
        0.0122
    }
  };

  pushCloseButton = () => Navigation.pop(this.props.componentId, {
    component: {
      name: 'UserProfile'
    }
  });

  pushEditButton = () => Navigation.push(this.props.componentId, {
    component: {
      name: 'EditUser'
    }
  });


  pushRequestPage = () => Navigation.push(this.props.componentId, {
    component: {
      name: 'RequestPage'
    }
  });

  showDirections = () => {


    const endPoint = {
      longitude: this.state.focusedLocation.longitude,
      latitude: this.state.focusedLocation.latitude,
    }

    const transportPlan = 'd';

    OpenMapDirections(null, endPoint, transportPlan).then(res => {
      console.log(res)
    });
  }


  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentDidDisappear() {
    //no current function
  }

  componentDidAppear() {
    this.setState({
      focusedLocation: {
        ...this.state.focusedLocation,
        longitude: this.props.user.longitude,
        latitude: this.props.user.latitude,
      },
    });
  }

  render() {
    marker = <MapView.Marker coordinate={this.state.focusedLocation} />
    return (
      <View style={styles.container}>
        <View style={styles.icons}>
          <TouchableOpacity
            onPress={this.pushCloseButton}>
            <Icon size={35} name='ios-arrow-round-back' color='white' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.pushEditButton}>
            <Text style={{ color: 'white', fontSize: 16 }}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.alignment}>
          <Text style={styles.mainText}>{this.props.user.firstN} {this.props.user.lastN}</Text>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={this.pushRequestPage}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon size={25} name='ios-download' color='white' />
              <Text style={{ color: 'white', fontSize: 18 }}>  Requests</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.category}>Phone Number</Text>
          <Text style={styles.textInputStyle}>{this.props.user.phone}</Text>
          <Text style={styles.category}>Email</Text>
          <Text style={styles.textInputStyle}>{this.props.user.email}</Text>
          <Text style={styles.location}>Location</Text>
        </View>
        <MapView
          region={this.state.focusedLocation}
          style={styles.map}
          ref={ref => this.map = ref}
        >
          {marker}
        </MapView>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={this.showDirections}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>Get Directions</Text>
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
    justifyContent: 'space-between',
    marginTop: 40,
    width: '85%'
  },
  alignment: {
    width: '85%'
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 25,
    color: 'white'
  },
  category: {
    marginTop: 17,
    fontWeight: 'bold',
    fontSize: 17,
    color: '#7ABAF2'
  },
  location: {
    marginTop: 17,
    fontWeight: 'bold',
    fontSize: 17,
    color: '#7ABAF2',
    textAlign: 'center'
  },
  textInputStyle: {
    marginTop: 5,
    fontSize: 17,
    color: 'white',
  },
  map: {
    width: '100%',
    height: 350,
    marginTop: 10
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

const mapStateToProps = state => {
  return {
    user: state.reference.user,

  };
};


const mapDispatchToProps = dispatch => {
  return {


  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);