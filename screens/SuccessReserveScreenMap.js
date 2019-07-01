import React, { Component } from "react";
import { Dimensions, StyleSheet, View, Image,  Platform, Linking} from "react-native";
import { Container, Text, Card, Content, Body, Left, Button} from "native-base";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { API_KEY } from "../keys";
import { withNavigation } from "react-navigation"
import moment from 'moment'


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = API_KEY;

class SuccessReserveScreenMap extends Component {
  state = {
    coordinates: [
      {
        latitude: -6.2697656,
        longitude: 106.7824
      },
      {
        latitude: this.props.navigation.state.params.property.coordinate.latitude,
        longitude: this.props.navigation.state.params.property.coordinate.longitude
      }
    ]
  };

  mapView = null;

  onMapPress = e => {
    this.setState({
      coordinates: [...this.state.coordinates, e.nativeEvent.coordinate]
    });
  };

  openMap = () => {
    console.log(this.props.navigation.state.params.property, 'EMANG DAPAT APA');
    let {latitude, longitude} = this.props.navigation.state.params.property.coordinate
    
     console.log('open directions')
     let f = Platform.select({
          ios: () => {
              Linking.openURL(`http://maps.apple.com/maps?daddr=${latitude},${longitude}}`);
          },
          android: () => {
              console.log('ANDROID')
              Linking.openURL(`http://maps.google.com/maps?daddr=${latitude},${longitude}`).catch(err => console.error('An error occurred', err));;
          }
      });
     f()
  }


  render() {
    const { navigate } = this.props.navigation
    const mallProperty = this.props.navigation.state.params.property
    const dataMongo = this.props.navigation.state.params.dataMongo
    const currentCoord = this.props.navigation.state.params.currentLoc

    return (
      
      <Container style={{ flex: 1 }}>
        <MapView
          initialRegion={{
            latitude: currentCoord.latitude,
            longitude: currentCoord.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          style={{...StyleSheet.absoluteFill, flex: 1 }}
          ref={c => (this.mapView = c)}
          onPress={this.onMapPress}
        >
          {this.state.coordinates.map((coordinate, index) => (
            <MapView.Marker
              key={`coordinate_${index}`}
              coordinate={coordinate}
            />
          ))}
          {this.state.coordinates.length >= 2 && (
            <MapViewDirections
              origin={{latitude: currentCoord.latitude, longitude: currentCoord.longitude}}
              waypoints={
                this.state.coordinates.length > 2
                  ? this.state.coordinates.slice(1, -1)
                  : null
              }
              destination={
                this.state.coordinates[this.state.coordinates.length - 1]
              }
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="rgb(255,207,0)"
              optimizeWaypoints={true}
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${
                    params.destination
                  }"`
                );
              }}
              onReady={result => {
                console.log("Distance: ${result.distance} km");
                console.log("Duration: ${result.duration} min.");

                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 20,
                    bottom: height / 20,
                    left: width / 20,
                    top: height / 20
                  }
                });
              }}
              onError={errorMessage => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
         <View
          style={{
            flex: 1,
            marginTop: "25%",
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center"
          }}
        >
          <Card
            style={{
              marginTop: 20,
              backgroundColor: "rgb(255,255,255)",
              borderRadius: 25,
              width: Dimensions.get("window").width / 1.4,
              height: Dimensions.get("window").height / 2.7,
              elevation: 7
            }}
          >
             <Content scrollEnabled={false}>
                <Body style={{ padding: 25 }}>
                  <Text
                    style={{
                      ...styles.textCenter,
                      fontSize: 22,
                      fontWeight: "bold"
                    }}
                  >
                    {mallProperty.name}
                  </Text>
                  <Left>
                    <Text style={{ ...styles.bermargin, ...styles.smallerfont, marginTop: 7 }}>
                      <Text style={{  ...styles.smallerfont, fontWeight: "bold" }}>Reserved At :</Text>{" "}
                      {moment(dataMongo.createdAt).format('MMMM Do YYYY, h:mm:ss a')}{" "}
                    </Text>
                    <Text style={{ ...styles.bermargin, ...styles.smallerfont}}>
                      <Text style={{  ...styles.smallerfont, fontWeight: "bold" }}>ETA : </Text>
                      {moment(dataMongo.createdAt).add(15, 'minutes').format('MMMM Do YYYY, h:mm:ss a')}
                    </Text>
                    <Text style={{ ...styles.bermargin, ...styles.smallerfont, marginTop: 20 }}>
                      You are{" "}
                      <Text style={{ fontWeight: "bold", ...styles.smallerfont }}>{mallProperty.duration.split(" ")[0]} minutes</Text> to
                      the the spot
                    </Text>
                    <Text style={{ ...styles.bermargin, ...styles.smallerfont }}>
                      Your booking will end in{" "}
                      <Text style={{ fontWeight: "bold", ...styles.smallerfont }}>15 minutes</Text>, don't be late
                    </Text>
                  </Left>
                </Body>
              </Content>
            </Card>

            <Image
              resizeMode="contain"
              style={{ height: 140, marginVertical: 30 }}
              source={require("../assets/check_marker.png")}
            />
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                bottom: 3,
                left: 0,
                right: 0,
                alignContent : "center",
                justifyContent: "center",
                alignText : "center",
                padding: 15
              }}
            >
              <Button
                onPress={() => this.openMap()}
                style={{
                  marginTop: 35,
                  marginHorizontal : 7,
                  width: Dimensions.get("window").width / 2,
                  backgroundColor: "rgb(255,207,0)"
                }}
              >
                <Text style={{ fontWeight: "bold" }}>See Directions</Text>
              </Button>
              <Button
                onPress={() => navigate('HomeScreen')}
                style={{
                  marginTop: 35,
                  marginRight : 7,
                  width: Dimensions.get("window").width / 3,
                  backgroundColor: "rgb(0,0,0)"
                }}
              >
                <Text style={{textAlign :'center', fontWeight: "bold" }}>Done</Text>
              </Button>
            </View>
        </View> 
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textCenter: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center"
  },
  bermargin: {
    marginVertical: 3
  },
  smallerfont : {
    fontSize : 12
  }
});

export default withNavigation(SuccessReserveScreenMap);
