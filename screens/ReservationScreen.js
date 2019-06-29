import axios from 'axios'
import React, { Component } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { MapView } from "expo";
import { Container } from "native-base";
import API_KEY from '../keys.js'

//  INI PIM BRO
// {
//   name : 'Hacktiv8',
//   latlong : '-6.2697656,106.7824'
// }

export default class ReservationScreen extends Component {
  state = {
    location: null,
    errorMessage: null,
    locationReady: false,
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this.getLocationAsync();
    }
  }


  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location }, () => {
      this.setState({locationReady : true})
    });
  };

  render() {
    let text = "Waiting..";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    return (
      <Container style={{ flex: 1 }}>
          {this.state.locationReady ? (
            <MapView
              style={{ flex: 1 }}
              region={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            />
          ) : (
            <Text>Fetching map...</Text>
          )}
        <View style={styles.container}>
          <Text style={styles.paragraph}>{text}</Text>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  }
});
