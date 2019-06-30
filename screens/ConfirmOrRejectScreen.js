import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import { View, Text, Container, Card, Content, Body, Left, Button} from "native-base";
import { Col, Grid, Row } from "react-native-easy-grid";
import database from '../config'

const ConfirmOrRejectScreen = (props) => {
  const data = props.navigation.state.params.reservation.data
  const idnya = props.navigation.state.params.reservation.id
  console.log(props.navigation.state.params.reservation.data);
  console.log(props.navigation.state.params.reservation.id);


  const confirmReservation = async () => {
    let result = await database.ref(`/test/reservations/${idnya}`).update({status : "confirmed"})
    let result2 = await database.ref(`/test/parkingLot/${data.mallId}/${data.parkId}`).update({reserved : false, reservationId : ''})
  }

  const rejectReservation = async () => {
    let result = await database.ref(`/test/reservations/${idnya}`).update({status : "waiting"})
    let result2 = await database.ref(`/test/parkingLot/${data.mallId}/${data.parkId}`).update({rejected : true})
  }

  return (
    <Container style={{ padding: 20 }}>
      <Content>
        <Card
          style={{
            elevation: 10,
            borderRadius: 5,
            padding: 20,
            backgroundColor: "rgb(32,36,60)"
          }}
        >
          <Text
            style={{ ...styles.textForDark, fontWeight: "bold", fontSize: 23 }}
          >
            Nama Parkir
          </Text>
          <Text style={{ ...styles.textForDark }}>Jakarta, Indonesia</Text>
          <Text style={{ ...styles.textForDark }}>.top</Text>
        </Card>

        <Card
          style={{
            elevation: 10,
            borderRadius: 5,
            padding: 20,
            backgroundColor: "rgb(255,255,255)"
          }}
        >
          <Text style={{ ...styles.textForLight, marginBottom: 4 }}>
            <Text style={{ fontWeight: "bold" }}>Started at : </Text> 15:15
          </Text>
          <Text style={{ ...styles.textForLight, marginVertical: 4 }}>
            <Text style={{ fontWeight: "bold" }}>End at : </Text> 20:15
          </Text>
          <Text style={{ ...styles.textForLight, marginTop: 4 }}>
            <Text style={{ fontWeight: "bold" }}>Amount :</Text> $15
          </Text>
        </Card>
        <Card
          style={{
            borderRadius: 5,
            marginVertical: 8,
            padding: 20,
            paddingLeft: 5,
            elevation: 10,
            backgroundColor: "rgb(255,255,255)"
          }}
        >
          <Body>
            <Grid>
              <Col size={0.5}>
                <Left>
                  <Image
                    resizeMode="contain"
                    style={{ height: 38, marginTop: 7 }}
                    source={require("../assets/checked.png")}
                  />
                </Left>
              </Col>
              <Col style={{ paddingLeft: 10 }} size={3}>
                <Text style={{ ...styles.textForLight, marginBottom: 4 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    You are here in time!
                  </Text>
                </Text>
                <Text style={{ ...styles.textForLight, marginVertical: 4 }}>
                  Thank you for being in time!
                </Text>
              </Col>
            </Grid>
          </Body>
        </Card>
        <Container style={{marginTop:15, flexDirection : 'row', textAlign : 'center', alignItems : 'center', alignContent: 'center', justifyContent: 'space-around'}}>
          <Button
            onPress={() => confirmReservation()}
            style={{ width: Dimensions.get("window").width / 3 + 40, textAlign : 'center', alignItems : 'center', alignContent: 'center', textAlign : 'center', backgroundColor: "rgb(255,207,0)" }}
          >
            <Text style={{ fontWeight: "bold" }}>Confirm</Text>
          </Button>
          <Button
            onPress={() => rejectReservation()}
            style={{ width : Dimensions.get("window").width / 3 + 40, textAlign : 'center', backgroundColor: "rgb(32, 36, 61)" }}
          >
            <Text style={{ fontWeight: "bold" }}>Reject</Text>
          </Button>
        </Container>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  textForDark: {
    color: "rgb(255,255,255)"
  },
  textForLight: {
    color: "rgb(32,36,60)"
  }
});
export default ConfirmOrRejectScreen;
