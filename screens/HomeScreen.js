import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, AsyncStorage} from "react-native";
import { connect } from "react-redux";
import { Button } from "native-base";
import firebase from "firebase";
import { Permissions, Notifications } from "expo";

const HomeScreen = props => {
    const { navigate } = props.navigation
    const [currentUser, setCurrentUser] = useState("")
    const [expoToken, setToken] = useState("")
    const [currentRes, setCurrentReservation] = useState({})
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
          let orang = await AsyncStorage.getItem('uid')    

          console.log(currentUser, 'ada ga');
          
          setToken(token)
          firebase
            .database()
            .ref(`/test/user/${orang}`)
            .update({push_token : token});

        console.log(token, 'TOKEN PUSH');
        
        } catch (error) {
          console.log(error);
        }
      };

  const getUser = async () => {
    let orang = await AsyncStorage.getItem('uid')    
    await setCurrentUser(orang)
    await registerForPushNotificationsAsync();
  };

  const sendPushNotification = (obj) => {
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
        title: "Parking Confirmation",
        body: "Your parking lot status has changed"
      })
    });

    navigate('ConfirmOrRejectScreen', {
        reservation : {...obj}
    })
    
  };

  const listenReservation =  async () => {
    let orang = await AsyncStorage.getItem('uid')    

    await firebase.database()
    .ref(`test`)
    .on('value', async function (snapshot) {
        //kalo ada yang statusnya confirmation , ambil reservatui id, buat nembak parkins space
        for (let key in snapshot.val().reservations) {    
                  console.log('masuk');
                  console.log(snapshot.val().reservations[key]["uid"], '==', orang, snapshot.val().reservations[key]["status"], 'apaa' );

            if (snapshot.val().reservations[key]["uid"] == orang && snapshot.val().reservations[key]["status"] == 'confirmation') {
                console.log('changed detected');
                
                await setCurrentReservation({data : snapshot.val().reservations[key], id : key})
                await sendPushNotification({data : snapshot.val().reservations[key], id : key})
            }            
        }
    })
  }

  useEffect(() => {
    getUser()
    listenReservation()
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
