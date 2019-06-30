import React, { useState, useEffect } from "react";
import { View, Text, AsyncStorage, YellowBox, Image } from 'react-native'
import { bindActionCreators } from 'redux'
import { withNavigation } from "react-navigation";
import firebase from 'firebase'
import { connect } from 'react-redux'
YellowBox.ignoreWarnings(['Setting a timer']);


const SplashScreen = (props) => {
    const { navigate } = props.navigation



    const cekAsyncStorage = async () => {
        const token = await AsyncStorage.getItem('token');
        navigate(token ? 'App' : 'Intro');
    }
    
    useEffect(() => {
        setTimeout(() => {
            cekAsyncStorage()
        }, 1000 * 2);

    })


    return (
        <View style={{ flex: 1, 
        backgroundColor: "255,255,255" }}>
            <View style={
                {
                    flex: 8,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: "100%"
                }
            }>
                <Image
                    resizeMode="contain"
                    source={require("../assets/logo_splash_screen.png")}
                    style={{ height: 250 }}
                />
            </View>
            <View style={
                {
                    flex: 1,
                    width: "100%",
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                }
            }>
                <Text style={{
                    fontSize: 15
                }}></Text>
            </View>
        </View>


    )
}

export default withNavigation(SplashScreen)