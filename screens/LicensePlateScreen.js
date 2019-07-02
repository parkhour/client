import React, {useState} from "react";
import { View, Text, Image, TextInput, Dimensions} from "react-native";
import { Button } from 'native-base'

const LicensePlateScreen = (props) => {
    console.log(props.navigation);
   const [text, setText] = useState("")
   const { navigate } = props.navigation
   
    const validatePlate = () => {
        if (text === "") {
            alert('Please insert you plate number')
        } else {
            navigate('ChoicesScreen', {licensePlate : text})
        }
    }
  return (
    <View style={{justifyContent : 'center', flex : 1, alignContent : 'center', alignSelf : 'center'}}>
      <Image
        resizeMode="contain"
        source={require("../assets/plate.png")}
        style={{ marginLeft : 12 , height: 240, width : 240 }}
      ></Image>
      <Text style={{textAlign : 'center', marginVertical : 10}}>Input your license plate : </Text>
          <TextInput
        style={{height: 35, borderRadius : 14, padding: 6, width : Dimensions.get('window').width/1.5, borderColor: 'rgb(36,32,0)', borderWidth: 1}}
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <View style={{ marginVertical : 10, flexDirection : 'row', justifyContent : 'center', alignContent : 'center', alignItems : 'center'}}>
      <Button onPress={() => validatePlate()} style={{ width :Dimensions.get('window').width/4.3, height : 33, backgroundColor : 'rgb(255,207,0)'}} ><Text style={{ flex : 1, textAlign : 'center'}}>Input</Text></Button>
      </View>
    </View>
  );
};

export default LicensePlateScreen
