import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, AsyncStorage, ActivityIndicator, Dimensions } from "react-native";
import { connect } from "react-redux";
import { Button, Container, Content } from "native-base";
import firebase from "firebase";
import { Permissions, Notifications } from "expo";
import HistoryCard from "../components/HistoryCard";
import Faded from "../components/Faded"


const HomeScreen = props => {
const HEIGHT = Dimensions.get('window').height/2
  const { navigate } = props.navigation;
  const [currentUser, setCurrentUser] = useState("");
  const [expoToken, setToken] = useState("");
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

  const sendPushNotification = obj => {
    console.log("keinvoke");

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

            await setCurrentReservation({
              data: snapshot.val().reservations[key],
              id: key
            });
            await sendPushNotification({
              data: snapshot.val().reservations[key],
              id: key
            });
          }
        }
      });
  };

  const getUserHistory = async () => {
    try {
      let orang = await AsyncStorage.getItem("uid");
      let arrHistory = [];
      let lists = await firebase
        .database()
        .ref("/test/reservations")
        .once("value", async function(snapshot) {
          for (let key in snapshot.val()) {
            if (snapshot.val()[key]["uid"] == orang) {
              arrHistory.push(snapshot.val()[key]);
            }
          }
        });
      await setUserHistory(arrHistory);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    listenReservation();
    getUserHistory();
  }, []);

  return (
    <Container style={{padding : 20}}>
      <Content>
          <Text style={{...styles.grey, fontSize : 19, fontWeight : 'bold', marginBottom : 2}}>Your Previous Parks : </Text>
        {userHistory.length ? (
          <View>
            {userHistory.map((hist, idx) => <HistoryCard history={hist} key={idx}></HistoryCard> )}
          </View>
        ) : (
            <View style={{justifyContent : 'center', alignContent : 'center', alignItems : 'center', marginTop : Dimensions.get('window').height / 2}}>
                <ActivityIndicator size="large" color="rgb(255,207,0)" />
            </View>
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
    white : {
        color : 'rgb(255,255,255)'
    },
    yellow : {
        color : 'rgb(255,207,0)'
    },
    grey : {
        color : 'rgb(32,36,60)'
    }
})

const mapStatetoProps = state => {
  return { isLogin: state.auth.isLogin };
};
export default connect(
  mapStatetoProps,
  null
)(HomeScreen);
