import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  AsyncStorage
} from "react-native";

import MapView from "react-native-maps";
import { withNavigation } from "react-navigation";
import { API_KEY, BASEURL } from "../keys.js";
import axios from "axios";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as Font from "expo-font";
import { connect } from "react-redux";
import { saveLoc, savePropsOnReject } from "../store/actions/dataActions";

const Images = [
  {
    uri:
      "https://upload.wikimedia.org/wikipedia/id/thumb/5/59/PIM_logo.png/220px-PIM_logo.png"
  },
  {
    uri:
      "https://infopromodiskon.com/userfiles/uploads/logo-gandaria-city-jakarta.jpg"
  },
  {
    uri:
      "https://s3-ap-southeast-1.amazonaws.com/asset1.gotomalls.com/uploads/malls/logo/Ky1VidvWvtpHsJoJ-kota-kasablanka-1478243847_1.jpg"
  },
  { uri: "https://3mautofilm-id.com/images/klien/gi.png" }
];

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

class ChoicesScreen extends Component {
  state = {
    fontLoaded: false,
    location: null,
    errorMessage: null,
    locationReady: false,
    listReady: false,
    possibleParkingLocations: [],
    markers: [
      {
        id: "01",
        coordinate: {
          latitude: -6.2697656,
          longitude: 106.7824
        },
        name: "Pondok Indah Mall",
        description: "Jakarta Selatan",
        image: Images[0]
      },
      {
        id: "02",
        coordinate: {
          latitude: -6.2442,
          longitude: 106.7835
        },
        name: "Gandaria City",
        description: "Jakarta Selatan",
        image: Images[1]
      },
      {
        id: "03",

        coordinate: {
          latitude: -6.2241,
          longitude: 106.8432
        },
        name: "Kota Kasablanka",
        description: "Jakarta Selatan",
        image: Images[2]
      },
      {
        id: "04",

        coordinate: {
          latitude: -6.1951,
          longitude: 106.8209
        },
        name: "Grand Indonesia",
        description: "Jakarta Pusat",
        image: Images[3]
      }
    ],
    region: {
      latitude: -6.2697656,
      longitude: 106.7824,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  };

  async componentWillMount() {
    console.log(this.props.navigation.navigate);
    this.index = 0;
    this.animation = new Animated.Value(0);

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
    this.setState({ location }, async () => {
      console.log(location, "APA LOKASINYA");

      await this.setState({ locationReady: true });
      this.state.markers.forEach(async space => {
        console.log(space);
        await this.getETAAsync(space);
      });
    });
  };

  getETAAsync = async onCheckParkingSpace => {
    let loc = await Location.getCurrentPositionAsync({});

    console.log(onCheckParkingSpace, " YUHOEUHE");
    console.log(this.state.location.coords);

    let { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${
        loc.coords.latitude
      },${loc.coords.longitude}&destination=${
        onCheckParkingSpace.coordinate.latitude
      },${onCheckParkingSpace.coordinate.longitude}&key=${API_KEY}`
    );

    let duration = data.routes[0].legs[0].duration.text;
    console.log(duration);

    if (duration.split(" ")[0] <= 15) {
      console.log(duration, "BERAAPA KALI");
      let obj = { ...onCheckParkingSpace, duration };
      let arr = [obj];
      await this.setState({
        possibleParkingLocations: [
          ...this.state.possibleParkingLocations,
          ...arr
        ]
      });
    }
  };

  reserveParkSpace = async item => {
    // AsyncStorage.clear()

    try {
      let loc = await Location.getCurrentPositionAsync({});
      await saveLoc(loc);
      const token = await AsyncStorage.getItem("token");
      console.log(token, "ini ambil dr storage");
      const licensePlate = this.props.navigation.state.params.licensePlate;

      let { data } = await axios({
        method: "POST",
        url: `${BASEURL}/reservations`,
        data: {
          mallId: "01",
          parkId: 0,
          mallName: item.name,
          licensePlate
        },
        headers: {
          authorization: token
        }
      });
      const { navigate } = this.props.navigation;
      await navigate("SuccessReserveScreenMap", {
        property: item,
        dataMongo: data,
        licensePlate,
        currentLoc: loc.coords
      });

      this.props.savePropsOnReject({
        property: item,
        dataMongo: data,
        licensePlate,
        currentLoc: loc.coords
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp"
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp"
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        {this.state.possibleParkingLocations ? (
          <>
            <MapView
              ref={map => (this.map = map)}
              initialRegion={this.state.region}
              style={styles.container}
              customMapStyle={mapLayout}
            >
              {this.state.possibleParkingLocations.map((marker, index) => {
                const scaleStyle = {
                  transform: [
                    {
                      scale: interpolations[index].scale
                    }
                  ]
                };
                const opacityStyle = {
                  opacity: interpolations[index].opacity
                };
                return (
                  <MapView.Marker
                    key={index}
                    coordinate={marker.coordinate}
                    image={require("../assets/pin.png")}
                  >
                    <Animated.View style={[styles.markerWrap, opacityStyle]}>
                      <Animated.View style={[styles.ring, scaleStyle]} />
                      <View style={styles.marker} />
                    </Animated.View>
                  </MapView.Marker>
                );
              })}
            </MapView>
            <Animated.ScrollView
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              snapToInterval={CARD_WIDTH}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: this.animation
                      }
                    }
                  }
                ],
                { useNativeDriver: true }
              )}
              style={styles.scrollView}
              contentContainerStyle={styles.endPadding}
            >
              {this.state.possibleParkingLocations.map((marker, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.reserveParkSpace(marker)}
                >
                  <View style={styles.card}>
                    <Image
                      source={marker.image}
                      style={styles.cardImage}
                      resizeMode="cover"
                    />
                    <View style={styles.textContent}>
                      <Text numberOfLines={1} style={styles.cardtitle}>
                        {marker.name}
                      </Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        {marker.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </Animated.ScrollView>
          </>
        ) : (
          <Text>Fetching locations..</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    elevation: 3,
    borderRadius: 8,
    opacity: 0.9
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold"
  },
  cardDescription: {
    fontSize: 12,
    color: "#444"
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgb(32,36,60)"
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgb(255,207,0)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgb(255,222,0)"
  }
});

const mapLayout = [
  {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [
        {
            "color": "#444444"
        }
    ]
},
{
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
        {
            "color": "#f2f2f2"
        }
    ]
},
{
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "road",
    "elementType": "all",
    "stylers": [
        {
            "saturation": -100
        },
        {
            "lightness": 45
        }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [
        {
            "visibility": "simplified"
        }
    ]
},
{
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "water",
    "elementType": "all",
    "stylers": [
        {
            "color": "#fdcb08"
        },
        {
            "visibility": "on"
        }
    ]
}
];

const mapDispatchToProps = () => {
  return {
    saveLoc,
    savePropsOnReject
  };
};

export default withNavigation(
  connect(
    null,
    mapDispatchToProps
  )(ChoicesScreen)
);
