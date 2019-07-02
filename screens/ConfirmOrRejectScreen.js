import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import { View, Text, Container, Card, Content, Body, Left, Button, Header} from "native-base";
import { Col, Grid, Row } from "react-native-easy-grid";
import database from '../config'
import TopBar from "../components/TopBar";
import moment from 'moment'
import { connect } from 'react-redux'

const ConfirmOrRejectScreen = (props) => {
  console.log(props.navigation.state.params);
  const { navigate } = props.navigation
  const data = props.navigation.state.params.reservation.data
  const idnya = props.navigation.state.params.reservation.id

  const confirmReservation = async () => {
    let result = await database.ref(`/test/reservations/${idnya}`).update({status : "confirmed"})
    let result2 = await database.ref(`/test/parkingLot/${data.mallId}/${data.parkId}`).update({confirmed : true})

    alert('Reservation confirmed')
    props.navigation.navigate('AboutScreen')
  }

  const rejectReservation = async () => {
    let result = await database.ref(`/test/reservations/${idnya}`).update({status : "waiting"})
    let result2 = await database.ref(`/test/parkingLot/${data.mallId}/${data.parkId}`).update({rejected : true})
   
   
    alert('Reservation has been rejected')
    navigate('SuccessReserveScreenMap', 
      {...props.dataOnReject})
    // props.navigation.navigate('HomeScreen')
  }

  return (
    <Container style={{justifyContent: 'space-between'}} >
      <TopBar text={"Parking Confirmation"}></TopBar>
      <Content style={{ padding: 20 }} scrollEnabled={true}>

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
           {data.mallName}
          </Text>
          <Text style={{ ...styles.textForDark }}>Jakarta, Indonesia</Text>
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
            <Text style={{ fontWeight: "bold" }}>Started at : </Text> {moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
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
        <View style={{  marginTop:15, flexDirection : 'row', textAlign : 'center', alignItems : 'center', alignContent: 'center', justifyContent: 'space-around'}}>
          <Button
            onPress={() => confirmReservation()}
            style={{ flex : 1, width: Dimensions.get("window").width / 3 + 40, textAlign : 'center', alignItems : 'center', alignContent: 'center', textAlign : 'center', backgroundColor: "rgb(255,207,0)" }}
          >
            <Text style={{ fontWeight: "bold" }}>Confirm</Text>
          </Button>
          <Button
            onPress={() => rejectReservation()}
            style={{flex : 1, marginLeft : 10, width : Dimensions.get("window").width / 3 + 40, textAlign : 'center', backgroundColor: "rgb(32, 36, 61)" }}
          >
            <Text style={{ fontWeight: "bold" }}>Reject</Text>
          </Button>
        </View>
        <View style={{ flex : 4, marginTop: 80, justifyContent:'flex-end'}}>
          <Text style={{textAlign: "center", fontWeight : "bold", fontSize : 17, color :'grey'}}>You may pay later in our payment spot</Text>
        </View>
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

const mapStateToProps = (state) => {
  return { dataOnReject: state.data.dataOnReject }
}
export default connect(mapStateToProps, null)(ConfirmOrRejectScreen)
