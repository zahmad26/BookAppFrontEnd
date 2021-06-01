import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import MyTabs from "./app/Navigators/MyTabs";

const getFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./app/assets/fonts/OpenSans-SemiBold.ttf"),
    "playfair-display": require("./app/assets/fonts/PlayfairDisplay-Regular.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
