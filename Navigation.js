import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import FAwesomeIcon from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./screens/HomeScreen";
import ReservationScreen from "./screens/ReservationScreen";
import ListingScreen from "./screens/ListingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SuccessReserveScreen from "./screens/SuccessReserveScreen";
import SplashScreen from "./screens/SplashScreen"
import ConfirmOrRejectScreen from "./screens/ConfirmOrRejectScreen"
import ChoicesScreen from "./screens/ChoicesScreen";
import SuccessReserveScreenMap from "./screens/SuccessReserveScreenMap"

const ReservationStackNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: null,
    })
  },
  ListingScreen: {
    screen: ListingScreen,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
    })
  },
  ChoicesScreen: {
    screen: ChoicesScreen,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
    })
  },
  ReservationScreen: {
    screen: ReservationScreen,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: null,
    })
  },
  SuccessReserveScreen: {
    screen: SuccessReserveScreen,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: null,
    })
  },
});


const AuthStack = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,

    navigationOptions:{
      headerTransparent: true,
      headerLeft: null,
    }
  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions:{
      headerTransparent: true,
      headerLeft: null,
    }
  }
})

const LoadingStack = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions:{
      headerTransparent: true,
      headerLeft: null,
    }
  }
})


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
    
    ListingScreen: {
      screen: ListingScreen,
      navigationOptions: () => ({
        title : "Home",
          tabBarIcon: ({ tintColor }) => (
            <FAwesomeIcon name="search" color={tintColor} size={25} />
          )
        })
    },
    ReservationScreen: {
      screen: ReservationScreen,
      navigationOptions: () => ({
        title : "ReservationScreen",
          tabBarIcon: ({ tintColor }) => (
            <FAwesomeIcon name="car" color={tintColor} size={25} />
          )
        })
    },
    ChoicesScreen : {
      screen: ChoicesScreen,
      navigationOptions: () => ({
        title : "ChoicesScreen",
          tabBarIcon: ({ tintColor }) => (
            <FAwesomeIcon name="eye" color={tintColor} size={25} />
          )
        })
    },
    SuccessReserveScreenMap : {
      screen : SuccessReserveScreenMap,
      navigationOptions: () => ({
        title : "ChoicesScreen",
          tabBarIcon: ({ tintColor }) => (
            <FAwesomeIcon name="music" color={tintColor} size={25} />
          )
        })

    }
    // ConfirmOrRejectScreen: {
    //   screen: ConfirmOrRejectScreen,
    //   navigationOptions: () => ({
    //     tabBarIcon: ({ tintColor }) => (
    //       <FAwesomeIcon name="eye" color={tintColor} size={25} />
    //     )
    //   })
    // },
    // ListingScreen: {
    //   screen: ListingScreen,
    //   navigationOptions: () => ({
    //     tabBarIcon: ({ tintColor }) => (
    //       <FAwesomeIcon name="search" color={tintColor} size={25} />
    //     )
    //   })
    // },
    // ReservationScreen: {
    //   screen: ReservationScreen,
    //   navigationOptions: () => ({
    //     tabBarIcon: ({ tintColor }) => (
    //       <FAwesomeIcon name="car" color={tintColor} size={25} />
    //     )
    //   })
    // }
  },
  BottomNavigatorConfig,
  {
    initialRouteName: "App"
  }
);





const switchNav = createSwitchNavigator({
  authLoading: LoadingStack,
  App: AppNavigator,
  Auth: AuthStack

})

export default createAppContainer(switchNav);



