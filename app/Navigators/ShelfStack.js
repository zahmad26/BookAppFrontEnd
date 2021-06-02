import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BookDetailsScreen from "../screens/BookDetailsScreen";
import ShelfScreen from "../screens/ShelfScreen";

const Stack = createStackNavigator();

const ShelfStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Shelf Screen"
        component={ShelfScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Book Details" component={BookDetailsScreen} />
    </Stack.Navigator>
  );
};

export default ShelfStack;
