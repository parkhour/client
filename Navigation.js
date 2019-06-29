import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import FAwesomeIcon from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./screens/HomeScreen";
import ReservationScreen from "./screens/ReservationSreen";
import ListingScreen from "./screens/ListingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen"
import SplashScreen from "./screens/SplashScreen"

const ReservationStackNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true
    })
  },
  ListingScreen: {
    screen: ListingScreen,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true
    })
  },
  ReservationScreen: {
    screen: ReservationScreen,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true
    })
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true
    })

  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true
    })

  },
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true
    })
  }
});

const BottomNavigatorConfig = {
  tabBarOptions: {
    activeTintColor: "#E01C3F", //color when tab is active
    inactiveTintColor: "#ffffff",
    style: {
      backgroundColor: "#2b2d3a"
    },
    showLabel: false // turn off tab labels
  }
};

const AppNavigator = createBottomTabNavigator(
  {
    SplashScreen:{
      screen: SplashScreen,
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <FAwesomeIcon name="search" color={tintColor} size={25} />
        )
      })
    },
    HomeScreen: {
      screen: ReservationStackNavigator,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <FAwesomeIcon name="home" color={tintColor} size={25} />
        )
      })
    },
    ListingScreen: {
      screen: ListingScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <FAwesomeIcon name="search" color={tintColor} size={25} />
        )
      })
    }
  },
  BottomNavigatorConfig,
  {
    initialRouteName: "LoginScreen"
  }
);

export default createAppContainer(AppNavigator);
