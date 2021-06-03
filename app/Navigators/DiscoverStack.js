import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DiscoverScreen from "../screens/DiscoverScreen";
import AuthorScreen from "../screens/AuthorScreen";

import BookDetailsScreen from "../screens/BookDetailsScreen";

const Stack = createStackNavigator();

const DiscoverStack = (props) => {
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{ headerShown: false }}
        initialParams={{data: props}}
      />
      <Stack.Screen name="Author" component={AuthorScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Book Details" component={BookDetailsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default DiscoverStack;
