import React, { useState, useEffect } from "react";
import { View, Text,AsyncStorage} from 'react-native'
import { bindActionCreators} from 'redux'
import { withNavigation } from "react-navigation";
import firebase from 'firebase'
import { connect } from 'react-redux'

const SplashScreen = (props) => {
    const [async, setAsync] = useState('')
    const { navigate } = props.navigation
    const cekAsyncStorage = async () => {
        console.log('masuk sini')
        try {
            const data = await AsyncStorage.getItem('token')
            console.log(data,'ini adlaah')
            if (data !== null) {                
                setAsync(data)
            }
        } catch (error) {
            console.log('kok erro')

        }
    }
    useEffect(() => {
        setTimeout(() => {
            cekAsyncStorage()
            if (async != '') {
                console.log('async sama dengan = ', async)
                console.log('ini ketika tidak ada local storage')
                navigate('HomeScreen')
            } else {
                console.log('ini ketika ada local storage')
                console.log('async sama dengan = ', async)
                navigate('LoginScreen')
            }

        }, 2000);
    },[async])


    return (
        <View>
            <Text style={{
                fontSize: 40
            }}>Ini adalah splashscreen</Text>
        </View>
    )
}

export default withNavigation(SplashScreen)