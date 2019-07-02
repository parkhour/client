import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import FAwesomeIcon from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SplashScreen from "./screens/SplashScreen";
import ConfirmOrRejectScreen from "./screens/ConfirmOrRejectScreen";
import ChoicesScreen from "./screens/ChoicesScreen";
import SuccessReserveScreenMap from "./screens/SuccessReserveScreenMap";
import AboutScreen from "./screens/AboutScreen"
import LicensePlateScreen from "./screens/LicensePlateScreen"
import CompletedReservationScreen from "./screens/CompletedReservationScreen"
import IntroScreenOne from "./screens/IntroScreenOne"
import IntroScreenTwo from "./screens/IntroScreenTwo"
import IntroScreenThree from "./screens/IntroScreenThree"


const IntroScreen = createMaterialTopTabNavigator({
  IntroScreenOne: {
    screen: IntroScreenOne,
    navigationOptions: {
       tabBarVisible:false
    },
  },
  IntroScreenTwo: {
    screen: IntroScreenTwo,
    navigationOptions: {
       tabBarVisible:false
    },
  },
  IntroScreenThree: {
    screen: IntroScreenThree,
    navigationOptions: {
       tabBarVisible:false
    }
  }
})

const ReservationStackNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: false,
      headerLeft: null,
      headerTransparent: true,
    })
  },
  LicensePlateScreen : {
    screen: LicensePlateScreen,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true
    })
  },
  ChoicesScreen: {
    screen: ChoicesScreen,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true
    })
  },
  SuccessReserveScreenMap: {
    screen: SuccessReserveScreenMap,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: null
    })
  },
  ConfirmOrRejectScreen: {
    screen: ConfirmOrRejectScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: null,
      headerTransparent: true,

    })
  },
  CompletedReservationScreen : {
    screen: CompletedReservationScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: null,
      headerTransparent: true,

    })
  }
});

const AuthStack = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,

    navigationOptions: {
      headerTransparent: true,
      headerLeft: null
    }
  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      headerTransparent: true,
      headerLeft: null
    }
  }
});

const LoadingStack = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      headerTransparent: true,
      headerLeft: null
    }
  }
});

const BottomNavigatorConfig = {
  tabBarOptions: {
    activeTintColor: "rgb(255,207,0)", //color when tab is active,
    inactiveTintColor: "#ffffff",
    style: {
      backgroundColor: "rgb(32,36,60)"
    },
    showLabel: false // turn off tab labels
  }
};

const AppNavigator = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: ReservationStackNavigator,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <FAwesomeIcon name="home" color={tintColor} size={25} />
        )
      })
    },
    LicensePlateScreen: {
      screen: LicensePlateScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <FAwesomeIcon name="search" color={tintColor} size={25} />
        )
      })
    },
    AboutScreen: {
      screen: AboutScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <FAwesomeIcon name="car" color={tintColor} size={25} />
        )
      })
    },
    CompletedReservationScreen: {
      screen: CompletedReservationScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <FAwesomeIcon name="music" color={tintColor} size={25} />
        )
      })
    }
  },
  BottomNavigatorConfig,
  {
    initialRouteName: "App"
  }
);

const switchNav = createSwitchNavigator({
  authLoading: LoadingStack,
  Intro : IntroScreen,
  App: AppNavigator,
  Auth: AuthStack
});

export default createAppContainer(switchNav);
