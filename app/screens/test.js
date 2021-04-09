import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function App() {

  const login = () => {
    let body = { email: "sana12@gmail.com", password: "12345" };
    console.log('in Login', body);
    axios.post("http://localhost:5000/api/users/login", body).then((res) => {
      console.log("after api call", res);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setState({ email: text })}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => this.setState({ password: text })}
        />
      </View>
      <TouchableOpacity onPress={login}>
        <Text style={styles.signin}>SIGN IN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgot}>Don't have an account?</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.signup}>SIGN UP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 50,
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
  },
  forgot: {
    fontSize: 20,
    paddingTop: 40,
  },
  signup: {
    marginTop: 30,
    borderRadius: 10,
    borderColor: "#3e155a",
    borderWidth: 2,
    width: 250,
    height: 45,
    borderRadius: 5,
    textAlign: "center",
    paddingTop: 10,
    color: "#3e155a",
    fontWeight: "500",
    fontSize: 14,
  },
  signin: {
    backgroundColor: "#6b3f87",
    width: 250,
    height: 45,
    borderRadius: 5,
    marginTop: 5,
    color: "white",
    textAlign: "center",
    paddingTop: 10,
    fontWeight: "400",
    fontSize: 14,
  },
});
