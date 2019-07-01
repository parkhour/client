import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Body, Card, Left } from "native-base";
import moment from "moment";

const HistoryCard = props => {
  const { history } = props;
  return (
    <Card style={{ padding: 20, backgroundColor: 'rgb(32,36,61)', borderRadius : 7, elevation : 3 }}>
      <Text style={{...styles.white, fontWeight : 'bold', marginBottom : 2}}>{history.mallId}</Text>
      <Text style={{...styles.white, marginVertical : 2}}>{history.parkId}</Text>
      <Text style={{...styles.white, marginVertical : 2}}>{moment(history.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</Text>
      <Text style={{...styles.yellow, marginTop : 2, fontWeight : 'bold'}}>{history.status}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
    white : {
        color : 'rgb(255,255,255)'
    },
    yellow : {
        color : 'rgb(255,207,0)'
    }
})

export default HistoryCard;
