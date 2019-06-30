import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Button } from "native-base";
import firebase from "firebase";
import { Permissions, Notifications } from "expo";

const HomeScreen = props => {
    const [currentUser, setCurrentUser] = useState("")
    const [expoToken, setToken] = useState("")
    const registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
    
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
    
        if (finalStatus !== 'granted') {
          return;
        }
    
        try {
          let token = await Notifications.getExpoPushTokenAsync();
          setToken(token)
          firebase
            .database()
            .ref('/test/user/' + currentUser + '/push_token')
            .set(token);
        } catch (error) {
          console.log(error);
        }
      };

  const getUser = async () => {
    let orang = await firebase.auth().currentUser;
    await setCurrentUser(orang)
    await registerForPushNotificationsAsync();
    console.log(orang);
    
  };

  const sendPushNotification = () => {
    console.log('keinvoke');
      
    let response = fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: expoToken,
        sound: "default",
        title: "Demo",
        body: "Demo notificaiton"
      })
    });
  };

  useEffect(() => {
    getUser()
  }, [])

  return (
    <View>
      <Text>Welkomeee {props.isLogin}</Text>
      <Button onPress={() => sendPushNotification()}><Text>Pencet aku</Text></Button>
    </View>
  );
};

const mapStatetoProps = state => {
  return { isLogin: state.auth.isLogin };
};
export default connect(
  mapStatetoProps,
  null
)(HomeScreen);
