import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios";
import ip from "../config";

const LoginScreen = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(true);
  const errMessage = "Incorrect Email or Password";

  let user = {
    email: email,
    password: password,
  };

  const login = () => {
    //console.log("in Login", user);
    axios
      .post(`http://${ip}:5000/api/users/login`, user)
      .then((res) => {
        if (res.data.header.error != 1) {
          setLoggedIn(true);
          console.log(res.data.header.message, res.data.body);
          props.navigation.navigate("Tabs", {
            token: res.data.body.token,
            userId: res.data.body.id,
            fname: res.data.body.fname,
          });
        } else {
          errMessage = res.data.header.message;
          setLoggedIn(false);
          console.log(res.data.header.message);
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log("Login failed", err);
      });
  };

  function SubmitButton() {
    if (email && password) {
      return (
        <TouchableOpacity style={styles.signInButton} onPress={login}>
          <Text
            style={{
              color: "white",
              fontSize: 17,
              paddingTop: 2,
              fontFamily: "open-sans",
            }}
          >
            LOG IN
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          disabled
          style={[styles.signInButton, { backgroundColor: "#816687" }]}
          onPress={login}
        >
          <Text
            style={{
              color: "white",
              fontSize: 17,
              paddingTop: 2,
              fontFamily: "open-sans",
            }}
          >
            LOG IN
          </Text>
        </TouchableOpacity>
      );
    }
  }
  return (
    <SafeAreaView>
      <ImageBackground
        style={styles.bg}
        source={require("../assets/transparent.png")}
      >
        <View style={styles.container}>
          <Text style={styles.heading}>Log In</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
          />
          <Text style={{ color: "red", fontSize: 12, paddingTop: 2 }}>
            {loggedIn ? "" : errMessage}
          </Text>

          <SubmitButton />
          <Text
            style={{ marginTop: 30, fontSize: 14, fontFamily: "open-sans" }}
          >
            {" "}
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Signup");
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
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 2,
    // backgroundColor: "#fff",
    alignItems: "center",
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

export default LoginScreen;
