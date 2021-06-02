import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/SearchScreen";
import AuthorScreen from "../screens/AuthorScreen";
import ListScreen from "../screens/ListScreen";
import BookDetailsScreen from "../screens/BookDetailsScreen";

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="List Screen" component={ListScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default SearchStack;
