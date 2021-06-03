import { StatusBar } from "expo-status-bar";
import React from "react";
import { render } from "react-dom";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from "react-native";
import axios from "axios";

function SignUpScreen(props) {
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signUp, setSignUp] = React.useState(true);
  const errMessage = "Could not Sign Up. Please Retry";

  let user = {
    email: email,
    password: password,
    fname: fname,
    lname: lname,
    username: username,
  };

  const signup = () => {
    console.log("in SignUp", user);
    axios
      .post("http://192.168.10.4:5000/api/users/register", user)
      .then((res) => {
        if (res.data.header.error != 1) {
          setSignUp(true);
          console.log(res.data.header.message, res);
          props.navigation.navigate("Tabs", {
            token: res.data.token,
            userId: res.data.id,
            fname: res.data.body.fname,
          });
        }
      })
      .catch((err) => {
        setSignUp(false);
        console.log(res.data.header.message, err);
      });
  };
  const [confirmPw, setConfirmPw] = React.useState("");

  function SubmitButton() {
    if (fname && lname && email && username && password && confirmPw) {
      return (
        <TouchableOpacity onPress={signup} style={styles.signInButton}>
          <Text
            style={{
              color: "white",
              fontSize: 17,
              paddingTop: 2,
              fontFamily: "open-sans",
            }}
          >
            SIGN UP
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          disabled
          onPress={() => {
            props.navigation.navigate("Tabs");
          }}
          style={[styles.signInButton, { backgroundColor: "#816687" }]}
        >
          <Text
            style={{
              color: "white",
              fontSize: 17,
              paddingTop: 2,
              fontFamily: "open-sans",
            }}
          >
            SIGN UP
          </Text>
        </TouchableOpacity>
      );
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          style={styles.background}
          source={require("../assets/transparent.png")}
        >
          <View style={styles.container}>
            <Text style={styles.heading}>Sign Up</Text>
            <TextInput
              style={styles.input}
              onChangeText={setFname}
              value={fname}
              placeholder="First Name"
            />
            <TextInput
              style={styles.input}
              onChangeText={setLname}
              value={lname}
              placeholder="Last Name"
            />
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="Username"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              secureTextEntry
              placeholder="Password"
            />
            <TextInput
              style={styles.input}
              onChangeText={setConfirmPw}
              value={confirmPw}
              secureTextEntry
              placeholder="Confirm Password"
            />
            <Text style={{ color: "red", fontSize: 17, paddingTop: 2 }}>
              {signUp ? "" : errMessage}
            </Text>
            <SubmitButton />
            <Text
              style={{ marginTop: 30, fontSize: 14, fontFamily: "open-sans" }}
            >
              {" "}
              Have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Login");
              }}
              style={styles.signUpBtn}
            >
              <Text
                style={{
                  color: "#6B3F87",
                  fontSize: 17,
                  fontFamily: "open-sans",
                }}
              >
                LOG IN
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  background: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "stretch", // or 'stretch',
    justifyContent: "center",
  },

  heading: {
    fontSize: 36,
    marginTop: 30,
    marginBottom: 10,
    fontFamily: "playfair-display",
  },
  input: {
    height: 45,
    width: 300,
    margin: 12,
    paddingLeft: 6,
    borderRadius: 8,
    borderColor: "#A397AA",
    borderWidth: 1,
    fontFamily: "open-sans",
  },
  signInButton: {
    alignItems: "center",
    backgroundColor: "#6B3F87",
    padding: 10,
    marginTop: 24,
    marginBottom: 0,
    height: 48,
    width: 280,
    borderRadius: 8,
    fontFamily: "open-sans",
    // shadowColor: "#000000",
    // shadowOffset: { width: 0, height: 14 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    elevation: 30,
  },
  signUpBtn: {
    alignItems: "center",
    //backgroundColor: "#ffffff",
    padding: 10,
    marginTop: 24,
    marginBottom: 34,
    height: 48,
    width: 280,
    borderRadius: 8,
    borderColor: "#6B3F87",
    borderWidth: 2,
    fontFamily: "open-sans",
  },
  bg: {
    width: "100%",
    height: "100%",
    // flex: 1,
    resizeMode: "stretch", // or 'stretch',
    justifyContent: "center",

    // resizeMode: "cover",
    //justifyContent: "center"
  },
  // bg: {
  //   position:'absolute',
  //   bottom:0
  //   // flex: 1,
  //   // justifyContent: "center"
  // },
  pwBtn: {
    alignItems: "center",
    padding: 10,
    height: 48,
    width: 280,
  },
});
export default SignUpScreen;
