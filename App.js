import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import MyTabs from "./app/Navigators/MyTabs";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./app/screens/LoginScreen";
import SignUpScreen from "./app/screens/SignupScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";

const getFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./app/assets/fonts/OpenSans-SemiBold.ttf"),
    "playfair-display": require("./app/assets/fonts/PlayfairDisplay-Regular.ttf"),
  });
};

export default function App() {
  const Stack = createStackNavigator();

  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (fontsLoaded) {
    return(
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Splash"
            
          >
            <Stack.Screen
                name="Splash"
                component={WelcomeScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Tabs"
                component={MyTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={SignUpScreen} />
        </Stack.Navigator>
     </NavigationContainer>
    )
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
