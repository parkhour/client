import React, { useState, useEffect } from "react";
import { Button, Text } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native'
import * as Font from "expo-font";


const ButtonGeneral = (props) => {
    const [fontLoad, setFontLoad] = useState(false);
    const loadLocalFont = async () => {
      await Font.loadAsync({
        lgc_reg: require("../assets/louis_george_caf/Louis_George_Cafe.ttf"),
        helve_reg: require("../assets/coolvetica/coolvetica_condensed_rg.ttf")
      });
      await setFontLoad(true);
    };

    useEffect(() => {
        loadLocalFont();
      }, []);

      return fontLoad ?  (
        <Button onPress={()=>props.passFunction()} style={{width : Dimensions.get('window').width/3, backgroundColor: "rgb(32, 36,60)"}} rounded>
            <Text style={{...styles.generalText}}>{props.text}</Text>
          </Button>
    ) : null
}

const styles = StyleSheet.create({
    generalText : {
      fontFamily: "lgc_reg",
      color: "#f1ece1",
    }
   
  });
  

export default ButtonGeneral





