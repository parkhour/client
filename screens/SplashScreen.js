import React, { useState, useEffect } from "react";
import { View, Text, AsyncStorage } from 'react-native'
import { bindActionCreators } from 'redux'
import { withNavigation } from "react-navigation";
import firebase from 'firebase'
import { connect } from 'react-redux'

const SplashScreen = (props) => {
    const { navigate } = props.navigation


    const cekAsyncStorage = async () => {
        const token = await AsyncStorage.getItem('token');
        navigate(token ? 'App' : 'Auth');
    }


    useEffect(() => {
        setTimeout(() => {
            cekAsyncStorage()
        }, 2000);

    })


    return (
        <View>
            <Text style={{
                fontSize: 40
            }}>Ini adalah splashscreen</Text>
        </View>
    )
}

export default withNavigation(SplashScreen)