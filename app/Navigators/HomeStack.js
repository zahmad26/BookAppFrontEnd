import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import BookDetailsScreen from "../screens/BookDetailsScreen";
import ShelfScreen from "../screens/ShelfScreen";

const Stack = createStackNavigator();

const HomeStack = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
        initialParams={{ props }}
      />
      <Stack.Screen
        name="Book Details"
        component={BookDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Shelf Screen"
        component={ShelfScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
