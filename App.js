import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import Navigation from "./Navigation"
import Expo from 'expo';
import * as Font from "expo-font";
import store from './store/index'
import { Provider } from 'react-redux'



const App = () => {
  const [fontLoad, setFontLoad] = useState(false);
  const loadLocalFont = async () => {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    await setFontLoad(true);
  };
  useEffect(() => {
    loadLocalFont(); //for android font loaded

  }, []);
  return fontLoad ? (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  ) : null
};

export default App;
