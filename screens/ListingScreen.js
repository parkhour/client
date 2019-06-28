import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
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
  Icon
} from "native-base";
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
import database from '../config.js'

const listParkingSpace = [
  {
    id : '01',
    name: "Pondok Indah Mall",
    latlong: "6.2697656,106.7824",
    image: "https://inugo.com/wp-content/uploads/2018/04/final-mall@2x.png"
  },
  {
    id : '02',
    name: "Kota Kasablanka",
    latlong: "6.2241,106.8432",
    image: "https://inugo.com/wp-content/uploads/2018/04/final-mall@2x.png"
  },
  {
    id : '03',
    name: "Grand Indonesia",
    latlong: "6.1951,106.8209",
    image: "https://inugo.com/wp-content/uploads/2018/04/final-mall@2x.png"
  },
  {
    id : '04',
    name: "Gandaria City",
    latlong: "6.2442,106.7835",
    image: "https://inugo.com/wp-content/uploads/2018/04/final-mall@2x.png"
  }
];

export default class ListingScreen extends Component {
  state = {
    location: null,
    errorMessage: null,
    locationReady: false,
    listReady: false,
    possibleParkingLocations: []
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

  reserveParkSpace = async (id) => {
    database.ref('test')
    .on('value', function(snapshot){
        snapshot.val().parkingLot[id].forEach(async (space, idx) => {
            if (space.status == 'empty') {
                // CHANGE PARK SPACE STATUS INTO RESERVED AND SEND THE USER ID FROM STORE
                await database.ref(`/test/parkingLot/${id}/${idx}`).update({status : "reserved", uid : 'DARI STORE YA'})

                // CREATE RESERVATION AS WAITING AND SEND THE USER ID FROM STORE
                await database.ref(`/test/reservations/randomDULU`).set({parkId : id, status : 'waiting', uid : 'DARI STORE YA'})
            }
        })
    })
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
      <Container style={{ padding: 15 }}>
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
              <TouchableOpacity onPress={() => this.reserveParkSpace(space.id)} key={idx}>
                <Text>{JSON.stringify(space.name)}</Text>
              </TouchableOpacity>
            );
          })}
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
  /* <View>
          <DeckSwiper
            ref={c => (this._deckSwiper = c)}
            dataSource={listParkingSpace}
            renderEmpty={() => (
              <View style={{ alignSelf: "center" }}>
                <Text>Over</Text>
              </View>
            )}
            renderItem={item => (
              <Card
                borderRadius={20}
                style={{
                  width: Dimensions.get("window").width - 50,
                  elevation: 3
                }}
              >
                <CardItem style={{ height: 380 }} cardBody>
                  <Image
                    style={{ height: 230, flex: 1 }}
                    source={{ uri: item.image }}
                  />
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{ color: "#ED4A6A" }} />
                  <Text>{item.name}</Text>
                </CardItem>
              </Card>
            )}
          />
        </View> */
}
{
  /* <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
          <Button iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
            <Icon name="arrow-back" />
            <Text>Swipe Left</Text>
          </Button>
          <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
            <Icon name="arrow-forward" />
            <Text>Swipe Right</Text>
          </Button>
        </View> */
}
