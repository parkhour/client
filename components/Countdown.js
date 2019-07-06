import React, {useState, useEffect} from "react";
import { Text } from "react-native";
import { withNavigation } from 'react-navigation'

const Countdown = (props) => {
  let [timeEnd, setTimeEnd] = useState(props.createdAt);
  let [timeShow, setTimeShow] = useState("");
  let [time, setTime] = useState(0);
  let show = "";

  console.log(timeEnd, 'iNI APA PROPS DPT GAK')
  const makeTimer = async () => {
    await setTimeEnd(new Date().getTime());
  };

  useEffect(() => {
    if (time > 0) {
      setTime(15 * 60 * 1000 - (new Date().getTime() - timeEnd));
      setTimeShow(
        (Math.floor(time / 60000) < 10
          ? "0" + Math.floor(time / 60000)
          : Math.floor(time / 60000)) +
          ":" +
          (Math.floor((time / 1000) % 60) < 10
            ? "0" + Math.floor((time / 1000) % 60)
            : Math.floor((time / 1000) % 60))
      );
    }
    if (time == 0.0001) {
      alert ('Your reservation has been canceled')
      props.navigation.navigate('HomeScreen')
    }

  }, [time]);

  useEffect(() => {
    if (time > 0) {
      setTime(15 * 60 * 1000 - (new Date().getTime() - timeEnd));
    }
  }, [timeShow]);

  useEffect(() => {
    if (timeEnd > 0) {
      setTime(15 * 60 * 1000 - (new Date().getTime() - timeEnd));
    }
  }, [timeEnd]);

  return (
    <Text>
      {timeShow}
    </Text>
  );
};

export default withNavigation(Countdown);
