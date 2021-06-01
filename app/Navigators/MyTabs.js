import "react-native-gesture-handler";
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import DiscoverScreen from "../screens/DiscoverScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AuthorScreen from "../screens/AuthorScreen";
import HomeStack from "./HomeStack";
import DiscoverStack from "./DiscoverStack";

const Tab = createBottomTabNavigator();
const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="history"
      tabBarOptions={{
        activeTintColor: "#6B3F87",
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverStack}
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="compass" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
