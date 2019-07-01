import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Body, Card, Left, Grid, Col, Row , Right} from "native-base";
import moment from "moment";

const HistoryCard = props => {
  const { history } = props;
  return (
    <Card
      style={{
        padding: 20,
        backgroundColor: "rgb(32,36,61)",
        borderRadius: 7,
        elevation: 3
      }}
    >
      <Text style={{ ...styles.white, fontWeight: "bold", marginBottom: 2 }}>
        {history.mallName}
      </Text>
      <Text style={{ ...styles.white, marginVertical: 2 }}>
        <Text style={{ fontWeight: "bold" }}>Space :</Text> {history.parkId}
      </Text>
      <Text style={{ ...styles.white, marginVertical: 2 }}>
        {moment(history.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
      </Text>
      <Grid style={{ justifyContent : 'space-between'}}>
        <Col size={3}>
          <Text style={{ ...styles.yellow, marginTop: 2, fontWeight: "bold" }}>
            {history.status}
          </Text>
        </Col>
        <Col size={3}>
        <Text style={{ ...styles.yellow, textAlign : 'right', marginTop: 2, fontWeight: "bold" }}>$ Harga
          </Text>

        </Col>
      </Grid>
    </Card>
  );
};

const styles = StyleSheet.create({
  white: {
    color: "rgb(255,255,255)"
  },
  yellow: {
    color: "rgb(255,207,0)"
  }
});

export default HistoryCard;
