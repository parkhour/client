import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Body, Card, Left, Grid, Col, Row, Right } from "native-base";
import moment from "moment";

const HistoryCard = props => {
  const { history } = props;
  return (
    <Card
      style={{
        width: Dimensions.get("window").width / 1.1,
        padding: 20,
        backgroundColor: "rgb(255,255,255)",
        borderRadius: 7,
        elevation: 1.2
      }}
    >
      <Text style={{ ...styles.grey, fontWeight: "bold", marginBottom: 2 }}>
        {history.mallName}
      </Text>
      <Text style={{ ...styles.grey, marginVertical: 2 }}>
        <Text style={{ fontWeight: "bold" }}>Space :</Text> {history.parkId}
      </Text>
      <Text style={{ ...styles.grey, marginVertical: 2 }}>
        {moment(history.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
      </Text>
      <Grid style={{ justifyContent: "space-between" }}>
        <Col size={3}>
          <Text style={{ ...styles.yellow, marginTop: 2, fontWeight: "bold" }}>
            {history.status}
          </Text>
        </Col>
        <Col size={3}>
          {history.totalCharge ? (
            <Text
              style={{
                ...styles.yellow,
                textAlign: "right",
                marginTop: 2,
                fontWeight: "bold"
              }}
            >
              {history.totalCharge}{" "}
            </Text>
          ) : (
            <Text
              style={{
                ...styles.yellow,
                textAlign: "right",
                marginTop: 2,
                fontWeight: "bold"
              }}
            >
              {" "}
              IDR N/A{" "}
            </Text>
          )}
        </Col>
      </Grid>
    </Card>
  );
};

const styles = StyleSheet.create({
  grey: {
    color: "rgb(255,255,255)"
  },
  yellow: {
    color: "rgb(255,207,0)"
  },
  grey: {
    color: "rgb(32,36,60)"
  }
});

export default HistoryCard;
