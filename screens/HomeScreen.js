import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  YellowBox
} from "react-native";
import { saveReservation } from '../store/actions/dataActions';
import { connect } from "react-redux";
import * as Font from "expo-font";
import {
  Container,
  Icon,
  Button
} from "native-base";
import firebase from "firebase";
import { Permissions, Notifications } from "expo";
YellowBox.ignoreWarnings(["Can't perform"]);


const HomeScreen = props => {
  const HEIGHT = Dimensions.get("window").height / 2;
  const { navigate } = props.navigation;
  const [currentUser, setCurrentUser] = useState("");
  const [expoToken, setToken] = useState("");
  const [fontLoad, setFontLoad] = useState(false);
  const [currentRes, setCurrentReservation] = useState({});
  const [userHistory, setUserHistory] = useState([]);
  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }

    try {
      let token = await Notifications.getExpoPushTokenAsync();
      let orang = await AsyncStorage.getItem("uid");

      console.log(currentUser, "ada ga");

      setToken(token);
      firebase
        .database()
        .ref(`/test/user/${orang}`)
        .update({ push_token: token });

      console.log(token, "TOKEN PUSH");
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    let orang = await AsyncStorage.getItem("uid");
    await setCurrentUser(orang);
    await registerForPushNotificationsAsync();
  };

  const loadLocalFont = async () => {
    await Font.loadAsync({
      lgc_reg: require("../assets/louis_george_caf/Louis_George_Cafe.ttf"),
      helve_reg: require("../assets/coolvetica/coolvetica_condensed_rg.ttf")
    });
    await setFontLoad(true);
  };


  const sendPushNotification = async obj => {

    let response = fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: expoToken,
        sound: "default",
        title: "Parking Confirmation",
        body: "Your parking lot status has changed"
      })
    });

    navigate("ConfirmOrRejectScreen", {
      reservation: { ...obj }
    });
  };

  const listenReservation = async () => {
    let orang = await AsyncStorage.getItem("uid");

    await firebase
      .database()
      .ref(`test`)
      .on("value", async function(snapshot) {
        //kalo ada yang statusnya confirmation , ambil reservatui id, buat nembak parkins space
        for (let key in snapshot.val().reservations) {
          if (
            snapshot.val().reservations[key]["uid"] == orang &&
            snapshot.val().reservations[key]["status"] == "confirmation"
          ) {
            console.log("changed detected");
            saveReservation(
              {
                data: snapshot.val().reservations[key],
                id: key
              }
            )
            await setCurrentReservation({
              data: snapshot.val().reservations[key],
              id: key
            });
            await sendPushNotification({
              data: snapshot.val().reservations[key],
              id: key
            });
          } else if ( snapshot.val().reservations[key]["uid"] == orang 
          && snapshot.val().reservations[key]["status"] == "paid") {
            navigate("CompletedReservationScreen");
          }
        }
      });
  };

  useEffect(() => {
    // AsyncStorage.clear()
    loadLocalFont()
    getUser();
    listenReservation();
  }, []);

  return fontLoad ? (
    <Container style={{ backgroundColor: "rgb(255,207,0)" }}>
            
      <ImageBackground
        resizeMode="contain"
        source={require("../assets/taxi2.gif")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={{justifyContent : 'center', flex: 1,marginTop: 40, alignContent : 'center'}}>

        <Text style={{ ...styles.textnya }}>Hassle-free reservation</Text>
        <Text style={{ ...styles.textnya }}>at any hour</Text>
        <Text style={{ ...styles.textnya }}>with Parkhour</Text>
        </View>

        <View style={{justifyContent : 'center', flex : 1, marginTop : 200, flexDirection : 'row', alignContent : 'center'}}>
          <Button outline style={{backgroundColor: 'rgb(32,36,60)', padding : 20}} onPress={() => props.navigation.navigate('LicensePlateScreen')}>
             <Text style={{ ...styles.textnya, ...styles.yellow }}>Start Searching</Text>
             </Button>
        </View>
      </ImageBackground>
    </Container>
  ) :  <View style={{
    position: "absolute",
    flex: 8,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity : 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <ActivityIndicator size="small" color="rgb(225,207,0)" />
  </View>
}

const styles = StyleSheet.create({
  white: {
    color: "rgb(255,255,255)"
  },
  yellow: {
    color: "rgb(255,207,0)"
  },
  grey: {
    color: "rgb(32,36,60)"
  },
  textnya: {
    color: "rgb(32,36,60)",
    fontSize: 22,
    textAlign : 'center',
    fontFamily : 'lgc_reg'
  }
});

const mapStatetoProps = state => {
  return { 
    isLogin: state.auth.isLogin,
    currentReservation : state.data.currentReservation
  };
};

const mapDispatchToProps = () => {
  return {
    saveReservation
  }
}
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(HomeScreen);
