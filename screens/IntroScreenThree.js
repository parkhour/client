import React, { useEffect, useState } from "react";
import { View, Text, AsyncStorage, Image, ActivityIndicator } from 'react-native'
import { withNavigation } from "react-navigation";
import { Button } from "native-base";
import * as Font from "expo-font";



const IntroScreenThree = (props) => {
    const { navigate } = props.navigation
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
    })


    return fontLoad ? (
        <View style={{
            flex: 1,
            backgroundColor: "255,255,255"
        }}>
            <View style={
                {
                    flex: 1,
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
                    style={{
                        height: 130,
                        marginLeft: -10
                    }}
                    source={require("../assets/ph_logo.png")} />
            </View>
            <View style={
                {
                    flex: 2,
                    width: "100%",
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between'

                }
            }>
                <Text style={{
                    fontSize: 40,
                    fontWeight: "bold",
                    marginTop: 0,
                    fontFamily: "lgc_reg"
                }}>Easy Pay </Text>
                <Text style={{
                    fontSize: 20,
                    marginTop: 6,
                    marginBottom: 20,
                    fontFamily: "lgc_reg"
                }}>Hassle-free checkout </Text>
                <Image
                    resizeMode="contain"
                    style={{
                        height: 130,
                        margin: 10,
                    }}
                    source={require("../assets/wallet_yellow.png")} />

            </View>

            <View style={
                {
                    flex: 1,
                    width: "100%",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: 'row',
                }
            }>
                <Text style={{
                    color: "black",
                    fontSize: 100
                }}>
                    .
                </Text>


                <Text style={{
                    color: "black",
                    fontSize: 100
                }}>
                    .
                </Text>

                <Text style={{
                    color: "rgb(255,207,0)",
                    fontSize: 100
                }}>
                    .
                </Text>
            </View>

            <View style={
                {
                    flex: 1,
                    width: "100%",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: 'row',
                }
            }>
                <Button onPress={() => navigate('Auth')} style={{
                    backgroundColor: "rgb(255,207,0)",
                    paddingHorizontal: 50
                }}><Text
                    style={{
                        color: "white",
                        fontSize: 20
                    }}>Next</Text></Button>
            </View>

        </View>


    )
        : (
            <View style={{
                position: "absolute",
                flex: 8,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
}

export default withNavigation(IntroScreenThree)