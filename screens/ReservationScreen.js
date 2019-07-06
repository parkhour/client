// import axios from 'axios'
// import React, { Component } from "react";
// import { Platform, Text, View, StyleSheet, AsyncStorage } from "react-native";
// import Constants from "expo-constants";
// import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";
// import { MapView } from "expo";
// import { Container } from "native-base";
// import {API_KEY} from '../keys.js'

// const listParkingSpace = [
//   {
//     id: "01",
//     name: "Pondok Indah Mall",
//     latlong: "6.2697656,106.7824",
//     image: "https://inugo.com/wp-content/uploads/2018/04/final-mall@2x.png"
//   },
//   {
//     id: "02",
//     name: "Kota Kasablanka",
//     latlong: "6.2241,106.8432",
//     image: "https://inugo.com/wp-content/uploads/2018/04/final-mall@2x.png"
//   },
//   {
//     id: "03",
//     name: "Grand Indonesia",
//     latlong: "6.1951,106.8209",
//     image: "https://inugo.com/wp-content/uploads/2018/04/final-mall@2x.png"
//   },
//   {
//     id: "04",
//     name: "Gandaria City",
//     latlong: "6.2442,106.7835",
//     image: "https://inugo.com/wp-content/uploads/2018/04/final-mall@2x.png"
//   }
// ];


// export default class ReservationScreen extends Component {
//   state = {
//     location: null,
//     errorMessage: null,
//     locationReady: false,
//   };

//   componentWillMount() {
//     if (Platform.OS === "android" && !Constants.isDevice) {
//       this.setState({
//         errorMessage:
//           "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
//       });
//     } else {
//       this.getLocationAsync();
//     }
//   }


//   getLocationAsync = async () => {
//     let { status } = await Permissions.askAsync(Permissions.LOCATION);
//     if (status !== "granted") {
//       this.setState({
//         errorMessage: "Permission to access location was denied"
//       });
//     }

//     let location = await Location.getCurrentPositionAsync({});
//     this.setState({ location }, () => {
//       this.setState({locationReady : true})
//     });
//   };

//   render() {
//     let text = "Waiting..";
//     if (this.state.errorMessage) {
//       text = this.state.errorMessage;
//     } else if (this.state.location) {
//       text = JSON.stringify(this.state.location);
//     }

//     return (
//       <Container style={{ flex: 1 }}>
//           {this.state.locationReady ? (
//             <MapView
//               style={{ flex: 1 }}
//               region={{
//                 latitude: this.state.location.coords.latitude,
//                 longitude: this.state.location.coords.longitude,
//                 latitudeDelta: 0.0922,
//                 longitudeDelta: 0.0421
//               }}
//             />
//           ) : (
//             <Text>Fetching map...</Text>
//           )}
//         <View style={styles.container}>
//           <Text style={styles.paragraph}>{text}</Text>
//         </View>
//       </Container>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 0.5,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: "#ecf0f1"
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     textAlign: "center"
//   }
// });


import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import {API_KEY} from '../keys.js'

const GOOGLE_MAPS_APIKEY = API_KEY;

class Example extends Component {

  constructor(props) {
    super(props);

    // AirBnB's Office, and Apple Park
    this.state = {
      coordinates: [
        {
          latitude:  -6.2697656,
          longitude: 106.7824,
        },
        {
          latitude:  -6.2347656,
          longitude: 106.7824,
        },
      ],
    };

    this.mapView = null;
  }

  onMapPress = (e) => {
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        e.nativeEvent.coordinate,
      ],
    });
  }
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location }, async () => {
      await this.setState({ locationReady: true });
      listParkingSpace.forEach(async space => {
        console.log(space);
        await this.getETAAsync(space);
      });
    });
  };

  render() {
    return (
      <MapView
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={StyleSheet.absoluteFill}
        ref={c => this.mapView = c}
      >
        {this.state.coordinates.map((coordinate, index) =>
          <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
        )}
        {(this.state.coordinates.length >= 2) && (
          <MapViewDirections
            origin={this.state.coordinates[0]}
            waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): null}
            destination={this.state.coordinates[this.state.coordinates.length-1]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="rgb(255,207,0)"
            optimizeWaypoints={true}
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              console.log('Distance: ${result.distance} km')
              console.log('Duration: ${result.duration} min.')
              
              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: (width / 20),
                  bottom: (height / 20),
                  left: (width / 20),
                  top: (height / 20),
                }
              });
            }}
            onError={(errorMessage) => {
              // console.log('GOT AN ERROR');
            }}
          />
        )}
      </MapView>
    );
  }
}

export default Example;