import React, { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, Dimensions,AsyncStorage } from "react-native";
import { Container, Text, Header, Content, Item, Input, View } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import * as Font from "expo-font";
import ButtonGeneral from "../components/Button";
import { withNavigation } from "react-navigation";
import firebase from 'firebase'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import db from '../config'
import { loginFirebase } from '../store/actions/authActions'




const RegisterScreen = (props) => {
  const { navigate } = props.navigation
  const [fontLoad, setFontLoad] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [async, setAsync] = useState()


  const cekAsyncStorage = async () => {
    try {
      const data = await AsyncStorage.getItem('token')
      if (data !== null) {
        setAsync(data)
      }
    } catch (error) {

    }
  }

  const setAsyncStorage = async(token) => {
      try {
        await AsyncStorage.setItem('token', token);
      } catch (error) {
        
      }
  }

  const loadLocalFont = async () => {
    await Font.loadAsync({
      lgc_reg: require("../assets/louis_george_caf/Louis_George_Cafe.ttf"),
      helve_reg: require("../assets/coolvetica/coolvetica_condensed_rg.ttf")
    });
    await setFontLoad(true);
  };

  useEffect(() => {
    loadLocalFont()
     cekAsyncStorage()
    console.log(async)
    if (async != undefined) {
      navigate('HomeScreen')
    }

  }, [async]);

  const RegisterFunc = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        if (result) {
          onRegisterSuccess(result)
        }
      });
  }
  const onRegisterSuccess = (user) => {
    console.log(user.uid)
    db.database().ref('/test/user').update({
      [user.user.uid]: {
        email: user.user.email,
        res_history: '',
        location: {
          lat: '',
          long: ''
        }
      }
    })
      .then((docs) => {
        setAsyncStorage(user.user.uid)
        props.loginFirebase(user)
        navigate('LoginScreen')

      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setEmail('')
        setPassword('')
      })

  }

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
                  <ButtonGeneral passFunction={RegisterFunc} text={"Register"}></ButtonGeneral>
                </View>

                <Text onPress={() => navigate('LoginScreen')} style={{ ...styles.generalText, marginVertical: 10 }}>Already Have An Account?</Text>
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

export default connect(mapStatetoProps, mapDispatchToProps)(withNavigation(RegisterScreen))
