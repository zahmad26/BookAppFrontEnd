import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfileScreen from './app/screens/ProfileScreen';
import SignupScreen from './app/screens/SignupScreen';
import SigninScreen from './app/screens/SigninScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import APITestScreen from './app/screens/APITestScreen';

export default function App() {
  return <SigninScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
