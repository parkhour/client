import React from "react";
import { ImageBackground, Dimensions, Image, StyleSheet } from "react-native";
import {
  Container,
  Content,
  View,
  Card,
  Text,
  CardItem,
  Body,
  Left,
  Button
} from "native-base";
import { withNavigation } from "react-navigation"

const SuccessReserveScreen = ( props ) => {
    const { navigate } = props.navigation
  return (
    <Container>
      <ImageBackground
        source={require("../assets/login_bg.png")}
        imageStyle={{ opacity: 0.8, tintColor: "black" }}
        style={{ width: "100%", height: "100%" }}
      >
        <ImageBackground
          blurRadius={2}
          imageStyle={{ opacity: 0.9 }}
          source={require("../assets/success_bg.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <View
            style={{
              flex: 1,
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "space-around"
            }}
          >
            <Card
              style={{
                marginTop: 27,
                backgroundColor: "rgb(255,255,255)",
                borderRadius: 25,
                width: Dimensions.get("window").width / 1.2,
                height: Dimensions.get("window").height / 3,
                elevation: 7
              }}
            >
              <Content scrollEnabled={false}>
                <Body style={{ padding: 25 }}>
                  <Text
                    style={{
                      ...styles.textCenter,
                      fontSize: 28,
                      fontWeight: "bold"
                    }}
                  >
                    Nama Tempat Parkir
                  </Text>
                  <Left>
                    <Text style={{ ...styles.bermargin, marginTop: 7 }}>
                      <Text style={{ fontWeight: "bold" }}>Reserved At :</Text>{" "}
                      12:00{" "}
                    </Text>
                    <Text style={{ ...styles.bermargin }}>
                      <Text style={{ fontWeight: "bold" }}>ETA : </Text>
                      12 : 10
                    </Text>
                    <Text style={{ ...styles.bermargin, marginTop: 20 }}>
                      You are{" "}
                      <Text style={{ fontWeight: "bold" }}>5 minutes</Text> to
                      the the spot
                    </Text>
                    <Text style={{ ...styles.bermargin }}>
                      Your booking will end in{" "}
                      <Text style={{ fontWeight: "bold" }}>15 minutes</Text>,
                    </Text>
                    <Text style={{ ...styles.bermargin }}>don't be late</Text>
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
                onPress={() => alert("get gmap keles")}
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
        </ImageBackground>
      </ImageBackground>
    </Container>
  );
};

const styles = StyleSheet.create({
  textCenter: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center"
  },
  bermargin: {
    marginVertical: 3
  }
});

export default withNavigation(SuccessReserveScreen);
