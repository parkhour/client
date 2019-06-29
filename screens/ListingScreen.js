import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import * as Font from "expo-font";
import axios from "axios";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import {
  Container,
  Button,
  Header,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon,
  Content
} from "native-base";
import { withNavigation } from "react-navigation";
import API_KEY from "../keys.js";

// import database from "../config.js";

const listParkingSpace = [
  {
    id: "01",
    name: "Pondok Indah Mall",
    latlong: "6.2697656,106.7824",
    image: "https://inugo.com/wp-content/uploads/2018/04/final-mall@2x.png"
  },
  {
    id: "02",
    name: "Kota Kasablanka",
    latlong: "6.2241,106.8432",
    image: "https://inugo.com/wp-content/uploads/2018/04/final-mall@2x.png"
  },
  {
    id: "03",
    name: "Grand Indonesia",
    latlong: "6.1951,106.8209",
    image: "https://inugo.com/wp-content/uploads/2018/04/final-mall@2x.png"
  },
  {
    id: "04",
    name: "Gandaria City",
    latlong: "6.2442,106.7835",
    image: "https://inugo.com/wp-content/uploads/2018/04/final-mall@2x.png"
  }
];

class ListingScreen extends Component {
  state = {
    fontLoaded: false,
    location: null,
    errorMessage: null,
    locationReady: false,
    listReady: false,
    possibleParkingLocations: []
  };

  async componentDidMount() {
    Font.loadAsync({
      coolve_rg: require("../assets/coolvetica/coolvetica_rg.ttf")
    });
    await this.setState({ fontLoaded: true }, async () => {
      await this.getLocationAsync();
    });
  }

  // async componentWillMount() {
  //   if (Platform.OS === "android" && !Constants.isDevice) {
  //     this.setState({
  //       errorMessage:
  //         "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
  //     });
  //   } else {
  //     // Font.loadAsync({
  //     //   'coolve_rg': require('../assets/coolvetica/coolvetica_rg.ttf'),
  //     // });
  //     // await this.setState({ fontLoaded: true });
  //     // this.getLocationAsync();
  //   }
  // }

  reserveParkSpace = async id => {
    // database.ref("test").on("value", function(snapshot) {
    //   snapshot.val().parkingLot[id].forEach(async (space, idx) => {
    //     if (space.status == "empty") {
    //       // CHANGE PARK SPACE STATUS INTO RESERVED AND SEND THE USER ID FROM STORE
    //       await database
    //         .ref(`/test/parkingLot/${id}/${idx}`)
    //         .update({ status: "reserved", uid: "DARI STORE YA" });

    //       // CREATE RESERVATION AS WAITING AND SEND THE USER ID FROM STORE
    //       await database
    //         .ref(`/test/reservations/randomDULU`)
    //         .set({ parkId: id, status: "waiting", uid: "DARI STORE YA" });

          const { navigate } = this.props.navigation
          console.log(this.props);
          console.log(navigate, 'bwhhhhh');
          await navigate ('SuccessReserveScreen', {id : id})
        // }
      // });
    // });
  };

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

  getETAAsync = async onCheckParkingSpace => {
    let { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=-${
        onCheckParkingSpace.latlong
      }&destination=-6.2697656,106.7824&key=${API_KEY}`
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

  render() {
    let text = "Waiting..";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    return (
      <>
        <ImageBackground
          source={require("../assets/login_bg.png")}
          imageStyle={{ opacity: 0.8, tintColor: "black" }}
          style={{ width: "100%", height: "100%" }}
        >
          <ImageBackground
            blurRadius={2}
            imageStyle={{ opacity: 0.9 }}
            source={require("../assets/reservation_bg.png")}
            style={{ width: "100%", height: "100%" }}
          >
            {this.state.fontLoaded ? (
              <React.Fragment>
                <View style={{ flex: 1, marginTop: "20%" }}>
                  <Text style={{...styles.center, fontSize : 23, fontWeight : 'bold'}}>SWIPE</Text>
                  <Text style={{ ...styles.center, fontSize : 19, marginBottom : 8 }}>
                    For spots 15 minutes away from you :
                  </Text>
                  {
                    this.state.possibleParkingLocations && 
                  <DeckSwiper
                    ref={c => (this._deckSwiper = c)}
                    dataSource={this.state.possibleParkingLocations}
                    renderEmpty={() => (
                      <View style={{ alignSelf: "center" }}>
                        <Text>Over</Text>
                      </View>
                    )}
                    renderItem={item => (
                      <>
                        <View style={{ ...styles.center }}>
                          <Card
                            style={{
                              backgroundColor: "rgb(255,255,255)",
                              borderRadius: 65,
                              width: Dimensions.get("window").width / 1.2,
                              height: Dimensions.get("window").height / 1.7,
                              elevation: 7
                            }}
                          >
                            <View
                              style={{ marginLeft: "-25%", marginTop: "13%" }}
                            >
                              <Image
                                resizeMode="contain"
                                style={{ height: 165 }}
                                source={require("../assets/landmark.png")}
                              />
                            </View>
                            <View
                              style={{
                                margin: 5,
                                padding: 20,
                                flexDirection: "column",
                                ...styles.center
                              }}
                            >
                              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                {item.name}
                              </Text>
                              <Text style={{fontSize : 15, color : 'rgb(20,29,86)'}}>Spaces Available : 30</Text>
                            </View>
                          </Card>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            position: "absolute",
                            bottom: 50,
                            left: 0,
                            right: 0,
                            justifyContent: "center",
                            padding: 15
                          }}
                        >
                          <Button onPress={() => this.reserveParkSpace(item.id)} style={{ backgroundColor: "rgb(255,207,0)" }}>
                            <Text style={{fontWeight : 'bold'}}>Reserve And Go</Text>
                          </Button>
                        </View>
                      </>
                    )}
                  />
                  }
                </View>
              </React.Fragment>
            ) : (
              <Text>Fontbelum ke load...</Text>
            )}
          </ImageBackground>
        </ImageBackground>
      </>
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
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center"
  },
  coolve: {
    fontFamily: "coolve_rg"
  }
});

{
  /* {
            this.state.locationReady ? (
                listParkingSpace.forEach(async (space) => {
                    console.log(space)                  
                    await this.getETAAsync(space)
                })
            ) : null
        } */
}

{
  /* <Container style={{ flex : 1, padding: 15 }}>
          <Header />
          <Text>
            These are our parking space that are within 15 minutes drive...
          </Text>
          {this.state.locationReady ? (
            <View style={styles.container}>
              <Text style={styles.paragraph}>{text}</Text>
            </View>
          ) : (
            <Text> Calculating distance.... </Text>
          )}

          {this.state.possibleParkingLocations &&
            this.state.possibleParkingLocations.map((space, idx) => {
              return (
                <TouchableOpacity
                  onPress={() => this.reserveParkSpace(space.id)}
                  key={idx}
                >
                  <Text>{JSON.stringify(space.name)}</Text>
                </TouchableOpacity>
              );
            })}
        </Container> */
}


// <Card
//   style={{
//     borderRadius : 65,
//     width: Dimensions.get("window").width - 100,
//     elevation: 7
//   }}
// >
//   <CardItem style={{ borderRadius : 65, height: 350, flexDirection: 'column' }} cardBody>
//     <Image
//       style={{  height: 230 }}
//       source={{ uri: item.image }}
//     />
//     <Icon name="heart" style={{ color: "#ED4A6A" }} />
//     <Text >{item.name}</Text>

//   </CardItem>
// </Card>

export default withNavigation(ListingScreen)
