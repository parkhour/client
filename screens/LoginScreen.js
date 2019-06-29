import React, { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, Dimensions, AsyncStorage } from "react-native";
import { Container, Text, Header, Content, Item, Input, View } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import * as Font from "expo-font";
import { bindActionCreators } from 'redux'
import ButtonGeneral from "../components/Button";
import { withNavigation } from "react-navigation";
import firebase from 'firebase'
import { connect } from 'react-redux';
import db from '../config'
import { loginFirebase } from '../store/actions/authActions'




const LoginScreen = (props) => {
  const { isLogin, ...rest } = props
  const { navigate } = props.navigation
  const [fontLoad, setFontLoad] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [async, setAsync] = useState('')

  const cekAsyncStorage = async () => {
    try {
      const data = await AsyncStorage.getItem('token')
      if (data !== null) {
        console.log(data)
        setAsync(data)
      }
    } catch (error) {

    }
  }

  const setAsyncStorage = async (value) => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (error) {
      // Error saving data
    }
    
  }

  

  const loadLocalFont = async () => {
    await Font.loadAsync({
      lgc_reg: require("../assets/louis_george_caf/Louis_George_Cafe.ttf"),
      helve_reg: require("../assets/coolvetica/coolvetica_condensed_rg.ttf")
    });
    await setFontLoad(true);
  };



  const loginFunc = (props) => {
    console.log(email, password)
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          onLoginSuccess(user)
          navigate('HomeScreen')
        }
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/invalid-email':
            console.log('Invalid email address format.');
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            console.log('Invalid email address or password');
            break;
          default:
            console.log('Check your internet connection');
        }

      })
  }
  const onLoginSuccess = (data) => {
    setEmail('')
    setPassword('')
    console.log(data.user.uid, AsyncStorage)
    setAsyncStorage(data.user.uid)
    props.loginFirebase(data)
  }

  useEffect(() => {
    cekAsyncStorage()
    loadLocalFont();
    console.log(async)
    if (async != '') {
      navigate('HomeScreen')
    }

  }, [async]);

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
              <Row size={0.3} style={{ ...styles.center }}>
                <Text style={{ ...styles.textTop }}>PARKHOUR</Text>
              </Row>

                <View style={{justifyContent : 'center', alignItems:"center"}}>
                <Item rounded style={{ padding:5, marginVertical:7, height:40, width: Dimensions.get("window").width/1.5, backgroundColor: "#f1ece1" }}>
                  <Input style={{...styles.generalText}} placeholder="Email" />
                </Item>
                
                <Item rounded style={{padding:5, height:40, width: Dimensions.get("window").width/1.5, backgroundColor: "#f1ece1" }}>
                  <Input style={{...styles.generalText}} placeholder="Password" />
                </Item>
                <View style={{ justifyContent: 'center', marginTop: 15, alignItems: "center" }}>
                  <ButtonGeneral passFunction={loginFunc} text={"Login"}></ButtonGeneral>
                </View>

                <Text onPress={() => navigate('RegisterScreen')} style={{ ...styles.generalText, marginVertical: 10 }}>Don't have an account?</Text>
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
  generalText: {
    fontFamily: "lgc_reg",
    color: "rgb(20,29,86)",

  },
  center: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  }
});


const mapStatetoProps = (state) => {
  return { isLogin: state.auth.isLogin }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  loginFirebase
}, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(withNavigation(LoginScreen))
