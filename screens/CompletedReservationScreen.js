import React from 'react'
import { View, Text, Image, Dimensions} from 'react-native'
import {  Button } from 'native-base'

const CompletedReservationScreen = (props) => {
    const { navigate } = props.navigation
    return (
        <View style={{marginTop : Dimensions.get('window').height /4, justifyContent : 'center', flex : 1, alignContent : 'center', alignSelf : 'center'}}>
        <Image
          resizeMode="contain"
          source={require("../assets/complete.png")}
          style={{ marginLeft : 12 , height: 240, width : 240 }}
        ></Image>  

        <View style={{ borderRadius : 9, height : 38, backgroundColor : 'rgb(255,207,0)'}} >
          <Text style={{ padding: 10, flex : 1, textAlign : 'center'}}>Thank You For Parking with Parkhour</Text>
          </View>
          <View style={{flex : 1, paddingVertical: 13}}>

          <Text style={{textAlign : 'center', color : 'rgb(255,207,0)'}}  onPress={() => navigate('HomeScreen')}>Back to Home</Text>
          </View>


      </View>  
    )
}

export default CompletedReservationScreen
