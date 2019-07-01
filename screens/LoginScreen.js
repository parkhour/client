import React, { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, Dimensions, AsyncStorage, ActivityIndicator, Image } from "react-native";
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
import axios from 'axios'
import { BASEURL } from '../keys'



const LoginScreen = (props) => {
  const { isLogin, ...rest } = props
  const { navigate } = props.navigation
  const [fontLoad, setFontLoad] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loadLocalFont = async () => {
    await Font.loadAsync({
      lgc_reg: require("../assets/louis_george_caf/Louis_George_Cafe.ttf"),
      helve_reg: require("../assets/coolvetica/coolvetica_condensed_rg.ttf")
    });
    await setFontLoad(true);
  };


  const loginFunc =  async (props) => {
    try {
      console.log(email, password, 'ini datanyaaaa');
      
      let { data } = await axios.post(`${BASEURL}/login`, {
        email, password
      })

      console.log('balikkan dari backend', data);
      
      await  AsyncStorage.setItem('token', data.token)
      await  AsyncStorage.setItem('uid', data.uid)

      // props.loginFirebase(data.token)
      await setEmail('')
      await setPassword('')
      navigate('App')
      
    } catch (error) {
        console.log(error);
        switch (error.code) {
          case 'auth/invalid-email':
            alert('Invalid email address format.');
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            alert('Invalid email address or password');
            break;
          default:
            alert('Check your internet connection');
        }
        
    }
    // console.log(email, password)
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(user => {
    //     if (user) {
    //       onLoginSuccess(user)
    //       navigate('App')
    //     }
    //   })
    //   .catch(error => {
    // switch (error.code) {
    //   case 'auth/invalid-email':
    //     alert('Invalid email address format.');
    //     break;
    //   case 'auth/user-not-found':
    //   case 'auth/wrong-password':
    //     alert('Invalid email address or password');
    //     break;
    //   default:
    //     alert('Check your internet connection');
    // }
    //   })
  }


  useEffect(() => {
    loadLocalFont();
  });

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
              <Text style={{ ...styles.textTop }}></Text>
              <Row size={0.3} style={{ ...styles.center, }}>
                <Image
                  resizeMode="contain"
                  style={{ height: 230,
                  marginLeft:-10 }}
                  source={require("../assets/ph_logo.png")} />
              </Row>

              <View style={{ justifyContent: 'center', alignItems: "center" }}>
                <Item rounded style={{ padding: 5, marginVertical: 7, height: 40, width: Dimensions.get("window").width / 1.5, backgroundColor: "#f1ece1" }}>
                  <Input placeholder="Email" onChangeText={(text) => setEmail(text)} />
                </Item>

                <Item rounded style={{ padding: 5, height: 40, width: Dimensions.get("window").width / 1.5, backgroundColor: "#f1ece1" }}>
                  <Input type="password" placeholder="Password" onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
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
