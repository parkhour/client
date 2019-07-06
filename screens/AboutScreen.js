import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-native-easy-grid";
import { Container, Content } from "native-base";
import firebase from "firebase";
import { Permissions, Notifications } from "expo";
import HistoryCard from "../components/HistoryCard";
import TopBar from "../components/TopBar";
import Axios from "axios";
import { BASEURL } from "../keys";
import { TouchableOpacity } from "react-native-gesture-handler";

const AboutScreen = props => {
  const { navigate } = props.navigation;
  const [userHistory, setUserHistory] = useState([]);

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

            // await setCurrentReservation({
            //   data: snapshot.val().reservations[key],
            //   id: key
            // });
            // await sendPushNotification({
            //   data: snapshot.val().reservations[key],
            //   id: key
            // });
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
              arrHistory.push({ data: snapshot.val()[key], id: key });
            }
          }
        });
      await setUserHistory(arrHistory);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurentResFromDb = async () => {
    try {
      let { data } = await Axios.get(`${BASEURL}/reservations/`);
    } catch (error) {}
  };

  useEffect(() => {
    listenReservation();
    getUserHistory();
  }, []);

  return (
    <Container>
      <TopBar col={['#FFDD00','#FBB034']} textcol={"#ffffff"} text={"Your Previous Parks"} />

      <Content style={{ padding: 12 }}>
        <Text
          style={{
            ...styles.grey,
            fontSize: 19,
            fontWeight: "bold",
            marginBottom: 2
          }}
        />
        {userHistory.length ? (
          <Grid>
            <Col>
              {userHistory.map((hist, idx) => {
                console.log(hist);
                if (hist.data.status == "waiting") {
                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() =>
                        navigate("SuccessReserveScreenMap", {
                          property: hist,
                          dataMongo: getCurentResFromDb(hist.data.id),
                          licensePlate: hist.data.licensePlate,
                          currentLoc: props.loc.coords
                        })
                      }
                    >
                      <HistoryCard style={{ flex: 1 }} history={hist} />
                    </TouchableOpacity>
                  );
                } else if (hist.data.status == "confirmation") {
                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() =>
                        navigate("ConfirmOrRejectScreen", { ...hist })
                      }
                    >
                      <HistoryCard style={{ flex: 1 }} history={hist.data} />
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <HistoryCard key={idx} style={{ flex: 1 }} history={hist.data} />
                  );
                }
              })}
            </Col>
          </Grid>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              marginTop: Dimensions.get("window").height / 4
            }}
          >
            <ActivityIndicator size="large" color="rgb(255,207,0)" />
          </View>
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  white: {
    color: "rgb(255,255,255)"
  },
  yellow: {
    color: "rgb(255,207,0)"
  },
  grey: {
    color: "rgb(32,36,60)"
  }
});

const mapStatetoProps = state => {
  return {
    currentReservation: state.data.currentReservation,
    loc: state.data.loc
  };
};
export default connect(
  mapStatetoProps,
  null
)(AboutScreen);
