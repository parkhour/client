import React, { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, Dimensions } from "react-native";
import { Container, Text, Header, Content, Item, Input, View } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import * as Font from "expo-font";
import ButtonGeneral from "../components/Button";
import { withNavigation } from "react-navigation";

const LoginScreen = (props) => {
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
  }, []);

  return fontLoad ? (
    <Container style={{ ...styles.bgnya, flex: 1 }}>
      <ImageBackground
        source={require("../assets/login_bg.png")}
        imageStyle={{ opacity: 0.8, tintColor: "black" }}
        style={{ width: "100%", height: "100%" }}
      >
        <ImageBackground
          blurRadius={3}
          imageStyle={{ opacity: 0.9 }}
          source={require("../assets/login_bg.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <Grid>
            <Col>
              <Text style={{ ...styles.textTop }}>PXH</Text>
              <Row size={0.3} style={{ ...styles.center}}>
                <Text style={{ ...styles.textTop }}>PARKHOUR</Text>
              </Row>

                <View style={{justifyContent : 'center', alignItems:"center"}}>
                <Item rounded style={{ padding:5, marginVertical:7, height:40, width: Dimensions.get("window").width/1.5, backgroundColor: "#f1ece1" }}>
                  <Input placeholder="Email" />
                </Item>
                
                <Item rounded style={{padding:5, height:40, width: Dimensions.get("window").width/1.5, backgroundColor: "#f1ece1" }}>
                  <Input placeholder="Password" />
                </Item>
                <View style={{justifyContent : 'center',  marginTop:15, alignItems:"center"}}>
                <ButtonGeneral text={"Login"}></ButtonGeneral>
                </View>

                <Text onPress={() => navigate('RegisterScreen')} style={{...styles.generalText, marginVertical : 10}}>Don't have an account?</Text>
                </View>
            </Col>
          </Grid>
        </ImageBackground>
      </ImageBackground>
    </Container>
  ) : (
    <Text>Font error blm load</Text>
  );
};

const styles = StyleSheet.create({
  bgnya: {
    backgroundColor: "#f1ece1"
  },
  textTop: {
    fontFamily: "helve_reg",
    color: "rgb(20,29,86)",
    fontSize: 79
  },
  generalText : {
    fontFamily: "lgc_reg",
    color: "rgb(20,29,86)",

  },
  center: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default withNavigation(LoginScreen)
